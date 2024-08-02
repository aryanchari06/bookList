import { useEffect, useRef, useState } from 'react'
import './App.css'
import { nanoid } from 'nanoid'

function App() {

  const [books, setBooks] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [isbn, setIsbn] = useState('')

  const titleRef = useRef()
  const authorRef = useRef()
  const isbnRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (titleRef.current.value == "" || authorRef.current.value == "" || isbnRef.current.value == "") {
      alert("Please fill the details")
      return
    }
    const book = {
      bookTitle: title,
      bookAuthor: author,
      bookCode: isbn,
      id: nanoid()
    }
    setBooks((prev) => [...prev, book])
    titleRef.current.value = ''
    authorRef.current.value = ''
    isbnRef.current.value = ''
    console.log(book)
  }

  const deleteBook = (id) => {
    setBooks((prev)=> prev.filter((book)=>book.id!==id))
  }

  // useEffect(()=>{
  //   let fetchedBooks = JSON.parse(localStorage.getItem("books"))
  //   if(fetchedBooks.length>0 && fetchedBooks)
  //   {
  //     setBooks(fetchedBooks)
  //   }
  // }, [])

  useEffect(()=>{
    localStorage.setItem("books", JSON.stringify(books))
  }, [books])

  return (
    <div className='mx-10 flex flex-col items-center'>
      <div className='w-3/5'>
        <h2 className='text-5xl text-center py-2'>My <span className='text-blue-700'>Book</span>List</h2>

        <form action="" className=' flex flex-col'>
          <div className='flex flex-col'>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className='border border-gray-400 rounded-sm p-1'
              onChange={(e) => { setTitle(e.currentTarget.value) }}
              ref={titleRef} />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="author">Author</label>
            <input
              name="author"
              type='text'
              className='border border-gray-400 rounded-sm p-1'
              onChange={(e) => { setAuthor(e.currentTarget.value) }}
              ref={authorRef} />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="isbn">ISBN#</label>
            <input
              type="text"
              name='isbn'
              className='border border-gray-400 rounded-sm p-1'
              onChange={(e) => { setIsbn(e.currentTarget.value) }}
              ref={isbnRef} />
          </div>

          <button
            className='bg-blue-700 p-2 my-4 text-white'
            onClick={handleSubmit}>
            Submit</button>
        </form>

      </div>

      {/* table comes here */}
      <div className='mt-8 w-3/5'>

        <div className='grid grid-cols-4 '>
          <div className=' p-2 text-center border border-gray-300'>Title</div>
          <div className=' p-2 text-center border border-gray-300'>Author</div>
          <div className=' p-2 text-center border-l border-t border-b border-gray-300'>ISBN#</div>
          <div className=' border-t border-b border-r border-gray-300 p-2 text-center'></div>
        </div>

        {
          books.map((book) => (
          <div 
          className='grid grid-cols-4 bg-gray-100'
          key={book.id} >
            <div className=' p-2 text-center'>{book.bookTitle}</div>
            <div className=' p-2 text-center'>{book.bookAuthor}</div>
            <div className=' p-2 text-center'>{book.bookCode}</div>
            <div className=' p-2 text-center'>
              <button
                className='bg-red-500 text-white p-1 rounded'
                onClick={()=>{deleteBook(book.id)}}
              >Delete</button>
            </div>
          </div>
          )

          )
        }


      </div>
    </div>
  )
}

export default App
