import {FORM_ACTION} from "../../model/FormAction";
import PlatformDropdown from "./PlatformDropdown";
import ActionButton from "../form/ActionButton";
import React, {useEffect, useState} from "react";
import {CRYPTOS_ENDPOINT, getCryptosURL} from "../../constants/Constants";
import NotFound from "../../pages/error/NotFound";
import Crypto from "../../model/Crypto";
import ErrorAlert from "../page/ErrorAlert";
import {HTTP_METHOD} from "../../model/HttpMethod";
import {NavigateFunction, useNavigate} from "react-router-dom";
import ApiErrorResponse from "../../model/ApiErrorResponse";
import ErrorResponse from "../../model/ErrorResponse";
import ErrorListAlert from "../page/ErrorListAlert";
import {HEADERS_VALUE} from "../../model/HeadersValue";
import {HEADERS} from "../../model/Headers";

const CryptoForm = ({action}: { action: FORM_ACTION }) => {

  const navigate = useNavigate();
  const [quantity, setQuantity] = useState("0.0");
  const [errors, setErrors] = useState<ErrorResponse[]>([]);
  const [cryptoName, setCryptoName] = useState("");
  const [cryptoPlatformName, setCryptoPlatformName] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [quantityInputError, setQuantityInputError] = useState(false);
  const [noChangesError, setNoChangesError] = useState(false);
  const [cryptoNameInputError, setCryptoNameInputError] = useState(false);
  const [cryptoPlatformInputError, setCryptoPlatformInputError] = useState(false);
  const [crypto, setCrypto] = useState<Crypto>({
    coinId: "",
    coinName: "",
    platform: "",
    quantity: 0n
  });

  if (action == FORM_ACTION.UPDATE) {
    useEffect(() => {
      const cryptoId: string = window.location.pathname.split('/').pop() ?? "";
      const cryptoInfoURL = getCryptosURL(cryptoId);

      fetch(cryptoInfoURL)
        .then(response => response.json())
        .then(data => {
          if (data.statusCode === 404) {
            setNotFound(true);
          }

          setCrypto(data);
          setQuantity(data.quantity)
          setCryptoPlatformName(data.platform)
        })
    }, [])
  }

  if (notFound) {
    return <NotFound/>
  }

  const redirectToCryptosPage = (navigate: NavigateFunction) => {
    navigate("/cryptos");
  }

  const isValidQuantity = (quantity: string) => {
    const regex = /^(?=.*[1-9])\d{0,16}(\.\d{1,12})?$/;

    return regex.test(quantity);
  }

  const isValidCryptoName = (cryptoName: string) => {
    if (cryptoName.length > 64) return false;
    const cryptoNameRegexValidation = /^(?! )(?!.*  )[a-zA-Z0-9]+(?:[ ][a-zA-Z0-9]+)*$(?<! )/;

    return cryptoNameRegexValidation.test(cryptoName);
  }

  const isValidPlatform = (platformName: string) => {
    return platformName !== "Select Platform" && !!platformName;
  }

  const addCrypto = (crypto: Crypto) => {
    const {coinName, quantity, platform} = crypto;
    const isInvalidCryptoName = !isValidCryptoName(coinName);
    const isInvalidQuantity = !isValidQuantity(quantity.toString());
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
      const request = JSON.stringify({
        coin_name: coinName,
        quantity,
        platform,
      });

      fetch(CRYPTOS_ENDPOINT, {
        method: HTTP_METHOD.POST,
        body: request,
        headers: {
          [HEADERS.CONTENT_TYPE]: HEADERS_VALUE.APPLICATION_JSON,
        }
      })
        .then(response => {
          if (response.ok) {
            redirectToCryptosPage(navigate);
          } else {
            response.json()
              .then((apiErrorResponse: ApiErrorResponse) => {
                setErrors(apiErrorResponse.errors);
              });
          }
        });
    }
  }

  const updateCrypto = (newCrypto: Crypto) => {
    const {coinName, quantity, platform} = newCrypto;

    const isInvalidQuantity = !isValidQuantity(quantity.toString());
    const isInvalidPlatform = !isValidPlatform(platform);

    if (isInvalidQuantity) {
      setQuantityInputError(true);
    }

    if (isInvalidPlatform) {
      setCryptoPlatformInputError(true);
    }

    if (crypto.quantity.toString() === quantity.toString() && crypto.platform === platform) {
      setNoChangesError(true);
      return;
    }

    if (!isInvalidQuantity && !isInvalidPlatform) {
      const cryptoId: string = window.location.pathname.split('/').pop() ?? "";
      const request = JSON.stringify({
        coin_name: coinName, // TODO - this should not be needed. Modify backend.
        quantity,
        platform
      });

      fetch(getCryptosURL(cryptoId), {
        body: request,
        method: HTTP_METHOD.PUT,
        headers: {
          [HEADERS.CONTENT_TYPE]: HEADERS_VALUE.APPLICATION_JSON,
        }
      }).then(response => {
        if (response.ok) {
          redirectToCryptosPage(navigate);
        } else {
          response.json()
            .then((apiErrorResponse: ApiErrorResponse) => {
              setErrors(apiErrorResponse.errors);
            });
        }
      });
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

  const handleCryptoNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCryptoName(event.target.value);

    if (isValidCryptoName(event.target.value)) {
      setCryptoNameInputError(false);
    } else {
      setCryptoNameInputError(true);
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
          title="Error adding Crypto"
          errors={errors}/>
      }

      <form className="my-4 w-10/12 md:w-9/12 lg:w-1/2">
        <div className="mb-6">
          <label htmlFor="base-input"
                 className={`${cryptoNameInputError ?
                   'text-red-500' :
                   'text-gray-900'} 
                   block mb-2 text-sm font-medium`}>
            Coin Name
          </label>
          {
            action == FORM_ACTION.ADD &&
            <input type="text"
                   id="base-input"
                   autoComplete="off"
                   placeholder="Bitcoin"
                   maxLength={65} // update to 64
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
        <PlatformDropdown
          classes={`${cryptoPlatformInputError ?
            'bg-red-100 border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' :
            'bg-gray-100 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'}
          border text-sm rounded-lg block w-full p-2.5`}
          platform={crypto?.platform}
          onChangeFunction={handleCryptoPlatformChange}/>
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
              coinId: "",
              coinName: cryptoName,
              quantity: quantity,
              platform: cryptoPlatformName
            })}/>
        }
        {
          action === FORM_ACTION.UPDATE &&
          <ActionButton
            text={`Update ${crypto.coinName}`}
            actionFunction={() => updateCrypto({
              coinId: crypto.coinId,
              coinName: crypto.coinName,
              quantity: quantity,
              platform: cryptoPlatformName
            })}/>
        }
      </form>
    </div>
  );
}

export default CryptoForm