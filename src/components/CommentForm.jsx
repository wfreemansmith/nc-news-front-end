import React from 'react'

function CommentForm() {
  return (
    <form onSubmit={() => {
      submitHandler()
    }}>
      <textarea>Hello</textarea>
      <button type="submit"></button>
    </form>
  )
}

export default CommentForm