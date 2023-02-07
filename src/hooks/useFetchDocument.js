import { useState, useEffect } from 'react'
import { db } from '../firebase/config'
import { doc, getDoc } from 'firebase/firestore'

// docCollection é a coleção onde pego os dados
export const useFetchDocument = (docCollection, id) => {
  const [document, setDocument] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false)

  //a função loadData foi criada  dentro do useEffect, pq toda vez q  mudar esses dados(docCollection, search, uid, cancelled) o loadData é chamado.
  useEffect(() => {
    async function loadDocument() {
      if (cancelled) {
        return
      }
      setLoading(true)

      try {
        const docRef = await doc(db, docCollection, id)
        const docSnap = await getDoc(docRef)

        setDocument(docSnap.data())

        setLoading(false)
      } catch (error) {
        console.log(error)
        setError(error.message)

        setLoading(false)
      }
    }
    loadDocument()
  }, [docCollection, id, cancelled])

  useEffect(() => {
    return () => setCancelled(true)
  }, [])
  //voltar como objeto para acessar os itens individualmente
  return { document, loading, error }
}
