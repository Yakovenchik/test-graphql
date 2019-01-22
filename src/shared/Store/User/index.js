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
                Authorization: `bearer 551811837a3e1305448ec2b5872eaa42c050a917`,
            },
            body: JSON.stringify({ query: query(name) }),
        })
            .then(res => res.json())
            .then(res => !res.errors ? this.user = res.data.user : null);
    }

}


