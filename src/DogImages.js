import React from 'react';

class DogImages extends React.Component {
  constructor() {
    super();

    this.fetchDogImages = this.fetchDogImages.bind(this);
    this.addImages = this.addImages.bind(this);

    this.state = {
      dogImgObj: undefined,
      loading: true,
      storedImages: [],
    }
  }

  async fetchDogImages() {
    this.setState(
      {loading: true},
      async () => {
        const fetchAPI = await fetch('https://dog.ceo/api/breeds/image/random');
        const requestObject = await fetchAPI.json();
        this.setState({
          dogImgObj: requestObject,
          loading: false,
        })
      }
    )
    
  }

  componentDidMount() {
    this.fetchDogImages();
  }

  addImages() {
    this.setState(({storedImages, dogImgObj}) => ({
      storedImages: [...storedImages, dogImgObj]
    }))

    this.fetchDogImages();
  }

  renderDogImageElement() {
    const { storedImages } = this.state;

    return (
      <div>
        <img width="300px" alt="" src={this.state.dogImgObj.message} />
        {/* {storedImages.map(({message}, index) => (<img key={index} alt="" src={message} />))} */}
      </div>
    );
  }
  render() {
    const { dogImgObj, loading, storedImages } = this.state;
    const loadingElement = <span>Loading...</span>;
    return (
      <div>
        <p>
          {storedImages.map(({message}, index) => (<img width="200px" key={index} alt="" src={message} />))}
        </p>
        <p>{loading ? loadingElement : this.renderDogImageElement()}</p>
        <button type='button' onClick={this.addImages}>
          Adicionar doguinho!
        </button>
      </div>
      
    );
  }
}

export default DogImages;