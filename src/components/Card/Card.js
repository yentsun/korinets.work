import React, {Component} from 'react';
import './Card.css';


export default class Card extends Component {

    constructor(props) {
        super(props);
        this.error = null;
        this.state = {
            loading: true
        };
    }

    async componentDidMount() {

        const {api, data} = this.props;
        let d;

        if (api && typeof api.fetcher === 'function' && !data) {
            try {
                d = await api.fetcher(...api.args);
                console.log(d)
            } catch (error) {
                console.log(error);
                this.error = error;
            }
        } else {
            d = data;
        }
        this.setState({loading: false, data: d});

    }

    render() {

        const {href, thumb} = this.props;
        const {loading, data} = this.state;

        return loading ? (<div className="card"><h1>Loading...</h1></div>) : (
            <div>
                <a href={href} className="card">
                    <div className="thumb" style={{backgroundImage: `url(${thumb})`}}/>
                    {data ? (
                        <article>
                            <h1>{data.major}</h1>
                            <span>{data.minor}</span>
                            <p>{data.content}</p>
                        </article>
                    ) : (
                        <article><h1>No data!</h1></article>
                    )}
                </a>
            </div>
        );
    }
}