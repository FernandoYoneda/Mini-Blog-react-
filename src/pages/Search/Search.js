import styles from './Search.module.css'
import { Link } from 'react-router-dom'

// hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery'

// components
import PostDetail from '../../component/PostDetail'

const Search = () => {
  const query = useQuery()
  // esse "q" é o valor de busca do componente Home
  const search = query.get('q')

  const { documents: posts } = useFetchDocuments('posts', search)

  return (
    <div className={styles.search_container}>
      <h2>Search</h2>
      <div>
        {/* Não econtrado nada em buscas*/}
        {posts && posts.length === 0 && (
          <>
            <p>Não foram encontrados posts a partir da sua busca...</p>
            <Link to="/" className="btn btn-dark">
              Voltar
            </Link>
          </>
        )}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>
    </div>
  )
}

export default Search
