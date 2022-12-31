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
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const storedRpcEndpoint = sessionStorage.getItem("rpcEndPoint");
    const storedContractAddress = sessionStorage.getItem("contractAddress");
    if (storedRpcEndpoint && storedContractAddress) {
      setFormValues({
        rpcEndpoint: storedRpcEndpoint,
        contractAddress: storedContractAddress
      });
      setShowForm(true);
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sessionStorage.setItem("rpcEndPoint", formValues.rpcEndpoint);
    sessionStorage.setItem("contractAddress", formValues.contractAddress);
    setShowForm(true);
  };

  const networkInfo = {
    rpc: formValues.rpcEndpoint,
    contract: formValues.contractAddress,
  }

  return (
    <>
      {showForm ? (
        <CheckBalance netInfo={networkInfo} />
      ) : (
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
    </>
  );
};
