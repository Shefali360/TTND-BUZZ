import React,{Component} from 'react';
import styles from './Corousel.module.css';
class Corousel extends Component{
    state = {
        idx: 0
    }

    prev = () => {
        const idx = this.state.idx - 1;
        if(idx >= 0)
            this.setState({idx: idx});
    }

    next = () => {
        const idx = this.state.idx + 1;
        if(idx < this.props.image.length)
            this.setState({idx: idx});
    }

    render(){
    const images=this.props.image;
        return(
            <div className={styles.carouselContainer}>
                <div className={styles.imageContainer}>
                    <img src={"http://localhost:3030/" + images[this.state.idx]} alt={images[this.state.idx]}/>
                </div>
                <a className={[styles.arrow,styles.prev].join(' ')} onClick={this.prev}><i className="fa fa-angle-left"/></a>
                <a className={[styles.arrow,styles.next].join(' ')} onClick={this.next}><i className="fa fa-angle-right"/></a>
            </div>
        );
    }
}
export default Corousel;