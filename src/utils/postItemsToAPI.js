const postTest = async (item) => {
  try {
    const res = await axios.post("http://localhost:8080", item);
    console.log(res);
  } catch (err) {
    console.log("Error posting data: ", err);
  }
};

const newArr = [];
const createNewObj = () => {
  // vv-------- must decalre a variable to loop----------
  data.forEach((item) => {
    const obj = {
      asin: item.asin,
      title: item.title,
      image: item.image,
      price: item.price.value,
      link: item.link,
      rating: item.rating,
      ratings_total: item.ratings_total,
    };
    newArr.push(obj);
  });

  // --------incomment to run----------
  // postTest(newArr)
};

createNewObj();
