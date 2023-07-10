import {FORM_ACTION} from "../../model/FormAction";
import PlatformDropdown from "./PlatformDropdown";
import ActionButton from "../form/ActionButton";
import React, {useEffect, useState} from "react";
import {
  CRYPTOS_ENDPOINT,
  getCryptosURL,
  isValidQuantity,
  MONGO_ID_REGEX
} from "../../constants/Constants";
import {Crypto} from "../../model/request/crypto/Crypto";
import {UpdateCrypto} from "../../model/request/crypto/UpdateCrypto";
import ErrorAlert from "../page/ErrorAlert";
import {NavigateFunction, useNavigate} from "react-router-dom";
import ErrorResponse from "../../model/response/ErrorResponse";
import ErrorListAlert from "../page/ErrorListAlert";
import axios from "axios";
import {useCryptoNameHook} from "../../hooks/useCryptoNameHook";

const CryptoForm = ({action}: { action: FORM_ACTION }) => {

  const navigate = useNavigate();
  const {
    cryptoName,
    cryptoNameInputError,
    handleCryptoNameChange,
    setCryptoNameInputError
  } = useCryptoNameHook()

  const [quantity, setQuantity] = useState("0.0");
  const [cryptoPlatformName, setCryptoPlatformName] = useState("");

  const [errors, setErrors] = useState<ErrorResponse[]>([]);
  const [quantityInputError, setQuantityInputError] = useState(false);
  const [noChangesError, setNoChangesError] = useState(false);
  const [cryptoPlatformInputError, setCryptoPlatformInputError] = useState(false);
  const [crypto, setCrypto] = useState<Crypto>();

  useEffect(() => {
    if (action == FORM_ACTION.UPDATE) {
      (async () => {
          const cryptoId: string = window.location.pathname.split('/').pop() ?? "";

          if (MONGO_ID_REGEX.test(cryptoId)) {
            const cryptoInfoURL = getCryptosURL(cryptoId);

            try {
              const {data} = await axios.get(cryptoInfoURL);

              setCrypto(data);
              setQuantity(data.quantity)
              setCryptoPlatformName(data.platform)
            } catch (err: any) {
              const {status} = err.response;
              if (status === 400) {
                setErrors(err.response.data.errors);
              }

              redirectToPage(status);
            }
          } else {
            navigate("/404");
          }
        }
      )();
    }
  }, []);

  const redirectToPage = (status: number) => {
    if (status === 404) {
      navigate("/404");
    }

    if (status >= 500) {
      navigate("/error");
    }
  }

  const redirectToCryptosPage = (navigate: NavigateFunction) => {
    navigate("/cryptos");
  }

  const isValidCryptoName = (cryptoName: string) => {
    if (cryptoName.length > 64) return false;
    const cryptoNameRegexValidation = /^(?! )(?!.* {2})[a-zA-Z0-9]+(?:[ {2}][a-zA-Z0-9]+)*$(?<! )/;

    return cryptoNameRegexValidation.test(cryptoName);
  }

  const isValidPlatform = (platformName: string) => {
    return platformName !== "Select Platform" && Boolean(platformName);
  }

  const addCrypto = async (crypto: Crypto) => {
    const {coinName, quantity, platform} = crypto;
    const isInvalidCryptoName = !isValidCryptoName(coinName);
    const isInvalidQuantity = !isValidQuantity(quantity);
    const isInvalidPlatform = !isValidPlatform(platform);

    if (isInvalidCryptoName) {
      setCryptoNameInputError(true);
    }

    if (isInvalidQuantity) {
      setQuantityInputError(true);
    }

    if (isInvalidPlatform) {
      setCryptoPlatformInputError(true);
    }

    if (!isInvalidCryptoName && !isInvalidQuantity && !isInvalidPlatform) {
      try {
        await axios.post(CRYPTOS_ENDPOINT, {
          coinName,
          quantity,
          platform,
        });

        redirectToCryptosPage(navigate);
      } catch (err: any) {
        setErrors(err.response.data.errors);
      }
    }
  }

  const updateCrypto = async (updatedCrypto: UpdateCrypto) => {
    const {quantity, platform} = updatedCrypto;

    const isInvalidQuantity = !isValidQuantity(quantity.toString());
    const isInvalidPlatform = !isValidPlatform(platform);

    if (isInvalidQuantity) {
      setQuantityInputError(true);
    }

    if (isInvalidPlatform) {
      setCryptoPlatformInputError(true);
    }

    if (crypto?.quantity.toString() === quantity.toString() && crypto.platform === platform) {
      setNoChangesError(true);
      return;
    }

    if (!isInvalidQuantity && !isInvalidPlatform) {
      const cryptoId: string = window.location.pathname.split('/').pop() ?? "";

      try {
        await axios.put(getCryptosURL(cryptoId), {
          quantity,
          platform
        });

        redirectToCryptosPage(navigate);
      } catch (err: any) {
        setErrors(err.response.data.errors);
      }
    }
  }

  const handleCryptoPlatformChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCryptoPlatformName(event.target.value);

    if (isValidPlatform(event.target.value)) {
      setCryptoPlatformInputError(false);
    } else {
      setCryptoPlatformInputError(true);
    }
  }

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setQuantity(event.target.value);

    if (isValidQuantity(event.target.value)) {
      setQuantityInputError(false);
    } else {
      setQuantityInputError(true);
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-4xl text-gray-900 text-center my-10">
        {
          action == FORM_ACTION.ADD && "Add Crypto"
        }
        {
          action == FORM_ACTION.UPDATE && `Edit ${crypto?.coinName}`
        }
      </h1>

      {
        noChangesError &&
        <ErrorAlert message="No changes were made"/>
      }

      {
        errors.length >= 1 &&
        <ErrorListAlert
          title={action === FORM_ACTION.ADD ? "Error adding Crypto" : "Error updating Crypto"}
          errors={errors}/>
      }

      <form className="my-4 w-10/12 md:w-9/12 lg:w-1/2">
        <div className="mb-6">
          <label htmlFor="base-input"
                 className={`${cryptoNameInputError ?
                   'text-red-500' :
                   'text-gray-900'} 
                   block mb-2 text-sm font-medium`}>
            Crypto Name
          </label>
          {
            action == FORM_ACTION.ADD &&
            <input type="text"
                   id="base-input"
                   autoComplete="off"
                   placeholder="Bitcoin"
                   maxLength={64}
                   onChange={event => handleCryptoNameChange(event)}
                   className={`${cryptoNameInputError ?
                     'bg-red-100 border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500 focus:outline-none' :
                     'bg-gray-100 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'} 
                     border text-sm rounded-lg block w-full p-2.5`}/>
          }
          {
            action == FORM_ACTION.UPDATE &&
            <input type="text"
                   id="disabled-input-2"
                   defaultValue={crypto?.coinName}
                   aria-label="disabled input"
                   className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed"
                   disabled readOnly/>
          }
          {
            cryptoNameInputError &&
            <p className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium">
              Crypto name must be 1-64 characters, using only letters, numbers and whitespaces.
            </p>
          }
        </div>
        <div className="mb-6">
          <label htmlFor="base-input"
                 className={`${quantityInputError ?
                   'text-red-500' :
                   'text-gray-900'} block mb-2 text-sm font-medium`}>
            Quantity
          </label>
          <input type="number"
                 id="base-input"
                 autoComplete="off"
                 value={quantity}
                 onChange={event => handleQuantityChange(event)}
                 className={`${quantityInputError ?
                   'bg-red-100 border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500 focus:outline-none' :
                   'bg-gray-100 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'} 
                 border text-sm rounded-lg block w-full p-2.5`}/>
          {
            quantityInputError &&
            <p className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium">
              Enter a number between 0 and 9999999999999999.999999999999.
            </p>
          }
        </div>

        {
          // if I don't do this, the dropdown randomly sometimes does not set as default value the crypto platform
          crypto?.platform &&
          <PlatformDropdown
            classes={`${cryptoPlatformInputError ?
              'bg-red-100 border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' :
              'bg-gray-100 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'}
          border text-sm rounded-lg block w-full p-2.5`}
            platform={crypto.platform}
            onChangeFunction={handleCryptoPlatformChange}/>
        }

        {
          // if I don't do this, the dropdown randomly sometimes does not set as default value the crypto platform
          !crypto?.platform &&
          <PlatformDropdown
            classes={`${cryptoPlatformInputError ?
              'bg-red-100 border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' :
              'bg-gray-100 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'}
          border text-sm rounded-lg block w-full p-2.5`}
            onChangeFunction={handleCryptoPlatformChange}/>
        }

        {
          cryptoPlatformInputError &&
          <p className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium">
            Select a valid platform.
          </p>
        }
        {
          action === FORM_ACTION.ADD &&
          <ActionButton
            text="Add Crypto"
            actionFunction={() => addCrypto({
              coinName: cryptoName,
              quantity,
              platform: cryptoPlatformName
            })}/>
        }
        {
          action === FORM_ACTION.UPDATE &&
          <ActionButton
            text={`Update ${crypto?.coinName}`}
            actionFunction={() => updateCrypto({
              quantity,
              platform: cryptoPlatformName
            })}/>
        }
      </form>
    </div>
  );
}

export default CryptoForm