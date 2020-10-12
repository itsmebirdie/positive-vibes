import React from 'react';
import { Redirect } from 'react-router-dom';
import { Wrapper } from '../Components/newsItem';
import { NewsConstructor } from './news';

import CheckAuth from '../services/checkAuth';
import FetchNews from '../services/fetchNews';

class SearchComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            news: [''],
            present: false,
            login: false,
            user: null,
            searchTerm: null
        }
    }

    async componentDidMount() {
        const token = localStorage.getItem("token")
        const user = JSON.parse(localStorage.getItem("user"));

        await CheckAuth.check(token).then(res => {
            this.setState({ user: user })
        }).catch(e => {
            this.setState({ login: true })
        })
        const { match: { params } } = this.props;
        this.setState({ searchTerm: params.query })

        await FetchNews.search(params.query, token).then(data => {
            if(Object.keys(data.data.resl).length < 1) {
                return
            } else {
                this.setState({ news: data.data.resl, present: true })
            }
        }).catch(e => {this.props.history.push('/')})
    }

    render() {
        const present = this.state.present;
        let login = this.state.login;
        let items;
        let searchTerm = this.state.searchTerm;
        if(login) {
            return <Redirect to="/login" />
        }
        if (!present) {
            items = <div>
                <NewsConstructor />
                <NewsConstructor />
                <NewsConstructor />
            </div>
        } else {
            items = this.state.news.map((item, key) => <NewsConstructor news={item} />);
        }
        return (
            <Wrapper>
                 <strong>Results for '{searchTerm}'</strong><br/>
                {items}
            </Wrapper>
        )
    }
}

export default SearchComponent;