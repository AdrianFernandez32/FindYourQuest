type Props = {
  name: string;
  imageURL: string;
};

const Option = ({ name, imageURL }: Props) => {
  console.log(imageURL);
  return (
    <div className="w-[90%] h-12 bg-white rounded-lg flex justify-start items-center duration-150 hover:bg-slate-100 hover:scale-105 ">
      <img src={imageURL} alt={name} className="h-2/3 ml-2 mr-3" />
      <h1 className="font-medium">{name}</h1>
    </div>
  );
};

export default Option;
