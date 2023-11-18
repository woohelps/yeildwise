import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import SymbolSearch from "./symbolSearch";
import { createSupabaseBrowserClient } from "@/utils/supabase/client";
import { toLocalISOTime } from "@/utils/function";
import { TransactionType, Transaction, Transactions } from "@/type";

interface TransactionFormProps {
  setShowModal: (show: boolean) => void;
  fetchTransactions: () => void;
  selectedTransaction: Transaction | null;
}

interface BaseTransaction {
  type: number;
  datetime: string;
  charge_amount?: number;
  account_id: number;
  amount: number;
}

interface StockTransaction extends BaseTransaction {
  stock_id: number;
  quantity: number;
  price_per_share: number;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  setShowModal,
  fetchTransactions,
  selectedTransaction,
}) => {
  const supabaseBrowserClient = createSupabaseBrowserClient();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  const pricePerShare = watch("price_per_share");
  const quantity = watch("quantity");

  useEffect(() => {
    if (pricePerShare && quantity) {
      const calculatedAmount = (
        parseFloat(pricePerShare) * parseInt(quantity)
      ).toFixed(2);
      setValue("amount", calculatedAmount);
    }
  }, [pricePerShare, quantity, setValue]);

  useEffect(() => {
    if (selectedTransaction) {
      Object.keys(selectedTransaction).forEach((key) => {
        if (key === "datetime") {
          const formattedDateTime = toLocalISOTime(selectedTransaction[key]);
          setValue(key, formattedDateTime);
        } else {
          setValue(
            key as keyof Transaction,
            selectedTransaction[key as keyof Transaction]
          );
        }
      });
    } else {
      reset();
    }
  }, [selectedTransaction, setValue, reset]);

  const onSubmit = async (data: any) => {
    const date = new Date(data.datetime);
    const offset = date.getTimezoneOffset();
    const utcDateTime = new Date(date.getTime() + offset);
    let inputData: BaseTransaction | StockTransaction = {
      type: parseInt(data.type),
      datetime: utcDateTime.toISOString(),
      charge_amount: data.charge_amount ? parseFloat(data.charge_amount) : 0,
      account_id: 1,
      amount: parseFloat(data.amount),
    };

    // Modify data as per transaction type before sending to the backend
    if (data.type === 3) {
      inputData = {
        ...inputData,
        stock_id: data.stock_id,
        quantity: parseInt(data.quantity),
        price_per_share: parseFloat(data.price_per_share),
        amount: -Math.abs(data.amount),
      };
    } else if (data.type === 4) {
      inputData = {
        ...inputData,
        stock_id: data.stock_id,
        quantity: parseInt(data.quantity),
        price_per_share: parseFloat(data.price_per_share),
        amount: Math.abs(data.amount),
      };
    } else if (data.type === 2) {
      inputData = {
        ...inputData,
        stock_id: data.stock_id,
      };
    }

    let result;
    if (selectedTransaction) {
      result = await supabaseBrowserClient
        .from("stocks_transaction")
        .update([inputData])
        .match({ id: selectedTransaction.id });
    } else {
      // Insert new transaction
      result = await supabaseBrowserClient
        .from("stocks_transaction")
        .insert([inputData]);
    }

    const { error } = result;
    if (error) {
      console.error("There was an error inserting the transaction", error);
    } else {
      // Assuming your state management is setup to handle the new transaction
      setShowModal(false);
      fetchTransactions();
      reset(); // Reset the form fields to initial values
    }
  };

  const transactionType = watch("type");

  const handleDelete = async () => {
    if (selectedTransaction && selectedTransaction.id) {
      const { error } = await supabaseBrowserClient
        .from("stocks_transaction")
        .delete()
        .match({ id: selectedTransaction.id });

      if (error) {
        console.error("There was an error deleting the transaction", error);
      } else {
        fetchTransactions();
        setShowModal(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label className="block text-grey-darker text-sm mb-2" htmlFor="type">
          Transaction Type
        </label>
        <select
          className="shadow border rounded w-full py-2 px-3 text-grey-darker"
          id="type"
          {...register("type", { required: true, valueAsNumber: true })}
        >
          <option value={0}>In</option>
          <option value={1}>Out</option>
          <option value={2}>Dividend</option>
          <option value={3}>Buy</option>
          <option value={4}>Sell</option>
        </select>
        {errors.type && (
          <p className="text-red-500 text-xs italic">
            Transaction type is required.
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-grey-darker text-sm mb-2"
          htmlFor="datetime"
        >
          Date and Time
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          type="datetime-local"
          id="datetime"
          {...register("datetime", { required: true })}
        />
        {errors.datetime && (
          <p className="text-red-500 text-xs italic">
            Date and time are required.
          </p>
        )}
      </div>
      {[2, 3, 4].includes(transactionType) && (
        <SymbolSearch
          register={register}
          setValue={setValue}
          watch={watch}
          stockId={selectedTransaction?.stock_id}
        />
      )}
      {[3, 4].includes(transactionType) && (
        <>
          <div className="mb-4">
            <label
              className="block text-grey-darker text-sm mb-2"
              htmlFor="price_per_share"
            >
              Price
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              type="number"
              step="0.01"
              id="price_per_share"
              {...register("price_per_share", {
                required: true,
                min: 0.01,
              })}
              placeholder="Enter price per share"
            />
            {errors.price_per_share && (
              <p className="text-red-500 text-xs italic">
                Please enter a valid price per share.
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-grey-darker text-sm mb-2"
              htmlFor="quantity"
            >
              Quantity
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              type="number"
              id="quantity"
              {...register("quantity", { required: true, min: 1 })}
              placeholder="Enter quantity"
            />
            {errors.quantity && (
              <p className="text-red-500 text-xs italic">
                Please enter a valid quantity.
              </p>
            )}
          </div>
        </>
      )}
      <div className="mb-4">
        <label className="block text-grey-darker text-sm mb-2" htmlFor="amount">
          Amount
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          type="number"
          step="0.01"
          id="amount"
          {...register("amount", { required: true })}
          placeholder="Enter amount"
        />
        {errors.amount && (
          <p className="text-red-500 text-xs italic">
            Please enter a valid amount.
          </p>
        )}
      </div>

      <label
        className="block text-grey-darker text-sm mb-2"
        htmlFor="charge_amount"
      >
        Charge Amount
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
        type="number"
        step="0.01"
        id="charge_amount"
        {...register("charge_amount", { required: false, min: 0 })}
        placeholder="Enter charge amount (optional)"
      />
      {errors.charge_amount && (
        <p className="text-red-500 text-xs italic">
          Please enter a valid charge amount.
        </p>
      )}

      <div className="flex justify-end pt-2 space-x-2">
        <button
          className="px-4 bg-transparent p-3 rounded-lg text-blue-500 hover:bg-gray-100 hover:text-blue-400 mr-2"
          type="button"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>
        {selectedTransaction && (
          <button
            className="px-4 bg-red-500 p-3 rounded-lg text-white hover:bg-red-400"
            type="button"
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
        <button
          className="px-4 bg-blue-500 p-3 rounded-lg text-white hover:bg-blue-400"
          type="submit"
        >
          {selectedTransaction ? "Update" : "Add"} Transaction
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
