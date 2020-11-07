import React from "react"
import { useQuery, useMutation } from "@apollo/client"
import gql from "graphql-tag"
import { Formik, Form, Field } from "formik"

const getBookmarks = gql`
  {
    bookmarks {
      id
      url
      title
      description
    }
  }
`
const addBookmark = gql`
  mutation addBookmark($url : String! , $description : String , $title : String!}) {
    addBookmark(url : $url , description : $description  , title : $title}) {
      url
      title
      description
    }
  }
`
const deleteBookmark = gql`
  mutation delBookmark($id: ID!) {
    delBookmark(id: $id) {
      url
      title
      description
    }
  }
`

export default function Home() {
  const { loading, error, data } = useQuery(getBookmarks)
  const [addBook] = useMutation(addBookmark)
  const [delBook] = useMutation(deleteBookmark)
  if (error) {
    return <h4>error</h4>
  }
  return (
    <div>
      <div>
        <Formik
          onSubmit={(value, action) => {}}
          initialValues={{
            url: "",
            description: "",
            title: "",
          }}
        >
          {formik => (
            <Form onSubmit={formik.handleSubmit}>
              <Field type="text" name="url" id="url" placeholder="link" />
              <Field type="text" name="title" id="title" placeholder="title" />
              <Field
                type="description"
                name="description"
                id="description"
                placeholder="description"
              />
              <button type="submit">submit</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
