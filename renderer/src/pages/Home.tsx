import { SpreadsheetComponent } from "@syncfusion/ej2-react-spreadsheet";

const Home = () => {
  return (
    <SpreadsheetComponent
      allowResizing // allowing auto resizing
      height={window.innerHeight} // setting component height to the inner height of the window
      width={window.innerWidth} // setting component width to the inner width of the window
    />
  );
};

export default Home;
