import { observable, action } from 'mobx';
import axios from 'axios';

const axiosGitHubGraphQL = axios.create({
    baseURL: 'https://api.github.com/graphql',
    headers: {
        Authorization: `bearer ${process.env.TOKEN}`,
    },
});
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
         return axiosGitHubGraphQL
            .post('', { query: query(name)})
            .then(result => this.user = result.data.data.user);
    }

}


