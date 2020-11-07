import React from "react"
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

const getBookmarks = gql`
{
  bookmarks{
    id
    url
    title
    description
  }
}
`

export default function Home() {
  
  const {loading , error , data} = useQuery(getBookmarks)
  console.log(data);
  
  return (
    <div>
      <div>Hello world!</div>

    </div>
  )
}
