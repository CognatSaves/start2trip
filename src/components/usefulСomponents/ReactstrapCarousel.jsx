import React from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';
import './ReactstrapCarousel.css'


export default class ReactstrapCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            animating: false,

        }
    }
    next = () => {
        if (this.state.animating) return;
        let nextIndex = this.state.activeIndex === this.props.items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous = () => {
        if (this.state.animating) return;
        let nextIndex = this.state.activeIndex === 0 ? this.props.items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex = (newIndex) => {
        if (this.state.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    render() {

        return (
            <>
                <Carousel
                    activeIndex={this.state.activeIndex}
                    next={this.next}
                    previous={this.previous}
                    slide={true}
                    interval={false}
                >
                    {this.props.items.length > 1 &&
                        <CarouselIndicators items={this.props.items} activeIndex={this.state.activeIndex} onClickHandler={this.goToIndex} />
                    }
                    {this.props.items.map((item) => {
                        return (
                            <CarouselItem
                                onExiting={() => this.setState({ animating: true })}
                                onExited={() => this.setState({ animating: false })}
                                key={item.url}

                            >
                                <div className="d-flex justify-content-center pb-5">
                                    <img src={item.url} alt={item.altText} />
                                </div>

                                <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
                            </CarouselItem>
                        );
                    })}
                    {this.props.items.length > 1 &&
                        <>
                            <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                            <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                        </>
                    }

                </Carousel>

            </>
        )
    }
}

