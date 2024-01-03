import { Result } from "antd";

export default function Home() {
  return (
    <div>
      <Result
        status="success"
        title="Successfully Purchased Cloud Server ECS!"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
      />
    </div>
  );
}
