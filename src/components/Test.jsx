const list = [1, 2, 3, 4, 5].map((item) => (
  <li key={item} onClick={(e) => console.log(e.target.key)}>
    {item}
  </li>
));

const Test = () => {
  return (
    <div>
      <ul>{list}</ul>
    </div>
  );
};

export default Test;
