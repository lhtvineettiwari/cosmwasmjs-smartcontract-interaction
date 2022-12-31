// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import { CheckBalance } from './CheckBalance';
interface FormValues {
  rpcEndpoint: string;
  contractAddress: string;
}
export const ChainInfo: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    rpcEndpoint: '',
    contractAddress: ''
  });
  const [showForm, setShowForm] = useState(false); // added this state variable to toggle the form visibility
  const [showNetForm, setShowNetForm] = useState(true);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
       // Store state in session storage when the component mounts or the state changes
      setShowForm(true);
     // set showForm to false to hide the form
     sessionStorage.setItem("rpcEndPoint", formValues.rpcEndpoint);
     sessionStorage.setItem("contractAddress", formValues.contractAddress); 
     window.location.reload();
  };
  useEffect(() => {
   // include formValues.rpcEndpoint in the dependency array
       if (sessionStorage.getItem("rpcEndPoint") && sessionStorage.getItem("contractAddress")){
        setShowNetForm(false);
        setShowForm(true);
      }
  }, []);
  const networkInfo = {
    rpc: formValues.rpcEndpoint,
    contract: formValues.contractAddress,
  }
  

  console.log("sessionStorage : ",sessionStorage.getItem("state"));
  console.log("showForm", showForm);
  
  
  return (
    <>
      {showNetForm && (
        <form onSubmit={handleSubmit}>
          <label>
            RPC Endpoint:
            <input
              type="text"
              name="rpcEndpoint"
              pattern="http?://.+:\d*"
              value={formValues.rpcEndpoint}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Contract Address:
            <input
              type="text"
              name="contractAddress"
              value={formValues.contractAddress}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      )}
      {showForm && <CheckBalance netInfo={networkInfo} />}
    </>
  );
};
