import styles from './CreatePost.module.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'

const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [imgage, setImage] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState('')

  const handleSubmit = (e) => {
    e.proventDefault()
  }

  return (
    <div>
      <h2>Criar post</h2>
      <p>Escreva osbre o que quiser e compartilhe o seu conhecimento</p>
      <form>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="title"
            required
            placeholder="Pense num bom título..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>URL da imagem:</span>
          <input
            type="text"
            name="image"
            required
            placeholder="insira uma imagem que represente seu post..."
            onChange={(e) => setImage(e.target.value)}
            value={Image}
          />
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea
            name="body"
            required
            placeholder="Insira o conteúdo do post"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            required
            placeholder="Insira as tags sepradas por vírgula"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
      </form>
    </div>
  )
}

export default CreatePost
