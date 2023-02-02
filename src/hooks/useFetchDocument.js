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

  useEffect(() => {
    async function loadData() {
      if (cancelled) return

      setLoading(true)

      //db é banco de dados, e o docCollection onde puxo a coleção
      const collectionRef = await collection(db, docCollection)

      try {
        // esse q para criar as querys mais complexas
        let q

        //buscar
        //dashboard

        //criando busca de dados, createAt busca data de criação e desc(decrescete)
        q = await query(collectionRef, orderBy('createAt', 'desc'))

        //snapshot sempre qyue tiver um dado alterado, ele traz o dado renovado(caso o snaoshot analise que tem um dado alterado, ele busca esse dado)
        await onSnapshot(q, (QuerySnapshot) => {
          setDocuments(
            QuerySnapshot.docs.map((doc) => ({
              //id dos doc vem separado do dados, por isso crio a chave id passando o valor do doc para essa chave
              id: doc.id,
              ...doc.data(),
            })),
          )
        })

        setLoading(false)
      } catch (error) {
        console.log(error)
        setError(error.message)

        setLoading(false)
      }
    }
    loadData()
  }, [docCollection, search, uid, cancelled])

  useEffect(() => {
    return () => setCancelled(true)
  }, [])
  return { documents, loading, error }
}
