import React, {Component} from 'react';
import './Card.css';


export default class Card extends Component {

    constructor(props) {
        super(props);
        this.error = null;
        this.state = {
            loading: true,
            data: null
        };
    }

    async componentDidMount() {

        const {apis, data} = this.props;
        let fetchedData;

        if (apis && !data) {
            try {
                const reqList = apis.map(([func, args]) => {
                    return func(...args);
                });
                const dataSets = await Promise.all(reqList);
                fetchedData = Object.assign(...dataSets);

            } catch (error) {
                console.log(error);
                this.error = error;
            }
        }

        this.setState({loading: false, data: fetchedData || data});
    }

    render() {

        const {href, thumb} = this.props;
        const {loading, data} = this.state;
        const link = (typeof href === "string") ? href : null;
        const clickHandler = (typeof href === "function") ? href : null;
        if (clickHandler) clickHandler.bind(this);

        return loading ? (<div className="card"><h1>Loading...</h1></div>) : (
            <div>
                <a href={link} onClick={clickHandler} className="card">
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