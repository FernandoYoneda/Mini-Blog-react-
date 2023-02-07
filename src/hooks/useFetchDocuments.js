import { useState, useEffect } from 'react'
import { db } from '../firebase/config'
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from 'firebase/firestore'

// docCollection é a coleção onde pego os dados
export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false)

  //a função loadData foi criada  dentro do useEffect, pq toda vez q  mudar esses dados(docCollection, search, uid, cancelled) o loadData é chamado.
  useEffect(() => {
    async function loadData() {
      if (cancelled) {
        return
      }
      setLoading(true)

      //db é banco de dados, e o docCollection puxa a coleção do banco
      const collectionRef = await collection(db, docCollection)

      try {
        // esse q para criar as querys mais complexas
        let q

        if (search) {
          //como as "tags" são arrays, temos acesso a um parâmetro chamado "array-contains"(firebase), e verfica que o item está dentro do array
          q = await query(
            collectionRef,
            where('tagsArray', 'array-contains', search),
            orderBy('createdAt', 'desc'),
          )
        } else {
          //criando busca de dados, createdAt busca data de criação e desc(decrescete)
          q = await query(collectionRef, orderBy('createdAt', 'desc'))
        }
        //snapshot sempre qyue tiver um dado alterado, ele traz o dado renovado(caso o snaoshot analise que tem um dado alterado, ele busca esse dado)
        await onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              //id dos doc vem separado do dados, por isso crio a chave id passando o valor do doc para essa chave
              id: doc.id,
              ...doc.data(),
            })),
          )
        })

        setLoading(false)
      } catch (error) {
        console.log(error)
        //state de erro para ver o que aconteceu
        setError(error.message)
      }
      setLoading(false)
    }
    loadData()
  }, [docCollection, search, uid, cancelled])

  console.log(documents)

  useEffect(() => {
    return () => setCancelled(true)
  }, [])
  //voltar como objeto para acessar os itens individualmente
  return { documents, loading, error }
}
