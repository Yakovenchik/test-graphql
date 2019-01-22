import { observable, action } from 'mobx';

const query = (name) => `
{
  user(login: "${name}") {
    login
    url
    bio
    company
    avatarUrl
    updatedAt
    repositories(first: 10) {
      edges {
        node {
          ... on Repository {
            name,
            createdAt,
            description,
            id
          }
        }
      }
    }
  }
}
`;

export default class UserStore {
    @observable user = {};
    @action addUser(name) {
        return fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `bearer a3ab76c9cc791a67aeca7015b543f9e71d43b1be`,
            },
            body: JSON.stringify({ query: query(name) }),
        })
            .then(res => res.json())
            .then(res => !res.errors ? this.user = res.data.user : null);
    }

}


