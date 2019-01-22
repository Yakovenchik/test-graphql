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
                Authorization: `bearer 5e7db2832101195b4d519ce04738dac714f90bf9`,
            },
            body: JSON.stringify({ query: query(name) }),
        })
            .then(res => res.json())
            .then(res => !res.errors ? this.user = res.data.user : null);
    }

}


