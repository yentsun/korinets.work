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

        const {fetcher, data} = this.props;

        if (typeof fetcher === 'function' && !data) {
            try {
                this.data = await fetcher();
            } catch (error) {
                this.error = error;
            }
        } else {
            this.data = data;
        }
        this.setState({loading: false});

    }

    render() {

        const {href, thumb, data: {major, minor, content}} = this.props;
        const {loading} = this.state;

        return loading ? (<div className="card"><h1>Loading...</h1></div>) : (
            <div>
                <a href={href} className="card">
                    <div className="thumb" style={{backgroundImage: `url(${thumb})`}}/>
                    <article>
                        <h1>{major}</h1>
                        <span>{minor}</span>
                        <p>{content}</p>
                    </article>
                </a>
            </div>
        );
    }
}