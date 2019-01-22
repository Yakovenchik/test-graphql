import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ListGroupItem, ListGroup, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,Label, InputGroup, InputGroupAddon, Input} from "reactstrap";


@inject('userStore')
@observer
class User extends Component{
     sendUser(name){
        const userStore = this.props.userStore;
        console.log(process.env.TOKEN);
        if (!name) {
            alert('Input name')
            }else {
             userStore.addUser(name);
            }
    }

    render(){
        const { user } = this.props.userStore;
        let name='';
        return(
            <div>
                <div>
                    <Label>Searching Users</Label>
                    <InputGroup>
                        <Input placeholder='Username' onChange={(item)=>name=item.target.value} id = 'inputArtistName'/>
                        <InputGroupAddon addonType="append"><Button onClick={()=>{
                            document.getElementById('inputArtistName').value = '';
                            this.sendUser(name);
                            name = '';
                        }}>Find</Button></InputGroupAddon>
                    </InputGroup>
                </div>
                {user.login ?
                    <div>
                        <Card body>
                            <CardImg
                                src={user.avatarUrl}
                                alt="Card image cap"/>
                            <CardBody>
                                <CardTitle>{user.login}</CardTitle>
                                <CardSubtitle>{user.url}</CardSubtitle>
                                <CardSubtitle>{user.company}</CardSubtitle>
                                <CardSubtitle>Last update: {user.updatedAt}</CardSubtitle>
                                <CardText>Biography: {user.bio ? user.bio : 'empty'}</CardText>
                                {user.repositories.edges.map(node =>
                                    (
                                        <ListGroup key={node.node.id}>
                                            <Label>
                                               Rep: {node.node.name}
                                            </Label>
                                            <ListGroupItem>
                                                description: {node.node.description ? node.node.description : 'empty'}
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                {node.node.createdAt}
                                            </ListGroupItem>
                                        </ListGroup>
                                    )
                                )};
                            </CardBody>
                        </Card>
                    </div>
                    :
                    null
                }
            </div>
        )
    }
}

export default User;