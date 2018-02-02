Для запуска нужно установить [докер](https://docs.docker.com/docker-for-mac/install/),
скачать проект, и в корне проекта запустить команду `docker-compose up`.

Весь код в папке `src/`.

После запуска проекта нужно перейти по адресу [http://localhost:3000/graphiql](http://localhost:3000/graphiql),
и вбить например такой запрос:


```graphql
{
  author(id:1){
    firstName
  	lastName
    posts{
      id
      title
      votes
      author {
        firstName
        lastName
        posts {
          title
        }
      }
    }
  }
}
```

Подробнее про graphql и graphql-dotnet я написал [тут](https://gist.github.com/dex157/2d713144c4b3fb54fcc16add74733b00).
