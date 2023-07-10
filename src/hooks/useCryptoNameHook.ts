import React, {useState} from "react";

export function useCryptoNameHook () {

  const [cryptoName, setCryptoName] = useState("");
  const [cryptoNameInputError, setCryptoNameInputError] = useState(false);

  const handleCryptoNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCryptoName(event.target.value);

    if (isValidCryptoName(event.target.value)) {
      setCryptoNameInputError(false);
    } else {
      setCryptoNameInputError(true);
    }
  }

  const isValidCryptoName = (cryptoName: string) => {
    if (cryptoName.length > 64) return false;
    const cryptoNameRegexValidation = /^(?! )(?!.* {2})[a-zA-Z0-9]+(?:[ {2}][a-zA-Z0-9]+)*$(?<! )/;

    return cryptoNameRegexValidation.test(cryptoName);
  }

  return {
    cryptoName,
    cryptoNameInputError,
    handleCryptoNameChange,
    setCryptoNameInputError
  }
}