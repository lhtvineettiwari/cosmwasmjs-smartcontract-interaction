import React, { useState } from 'react';
import { CosmWasmClient } from "cosmwasm";

interface FormValues {
  accountAddress: string;
}
type ChainInfoProps = {
  netInfo:{
    rpc: string;
    contract: string;
  }
}

export const CheckBalance = (props: ChainInfoProps) => {
  
  const [formValues, setFormValues] = useState<FormValues>({
    accountAddress: '',
  });
  const [balance, setBalance] = useState<string | undefined>();
  const [error, setError] = useState<string>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Call the API to get the balance for the given account address
    try {
      const client = await CosmWasmClient.connect(props.netInfo.rpc);
      const balanceResponse = await client.queryContractSmart(props.netInfo.contract, {balance: {address: formValues.accountAddress}});
      const balance = parseInt(balanceResponse.balance) / Math.pow(10, 6);
      const tokenInfoResponse = await client.queryContractSmart(props.netInfo.contract, {token_info: {address: formValues.accountAddress}});
      const symbol = tokenInfoResponse.symbol;
      const updateBalance = `${balance} ${symbol}`
      setBalance(updateBalance);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <>
    <form className='checkBalanceForm' onSubmit={handleSubmit}>
      <label>
        Account Address:
        <input
          type="text"
          name="accountAddress"
          value={formValues.accountAddress}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <button type="submit">Submit</button>
      {error && <p>{error}</p>}
      {balance && <p>Your balance is {balance}</p>}
    </form>
    </>
  );
};
