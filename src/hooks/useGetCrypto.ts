import {useEffect, useState} from "react";
import {Crypto} from "../model/response/crypto/Crypto";
import {getCryptoService} from "../services/cryptoService";
import {useNavigate, useParams} from "react-router-dom";
import {MONGO_ID_REGEX} from "../constants/Constants";

export function useGetCrypto() {

  const navigate = useNavigate();
  const params = useParams();
  const cryptoId: string = params.id!!;

  const [crypto, setCrypto] = useState<Crypto>();
  const [isLoading, setIsLoading] = useState(true);
  const [fetchInfoError, setFetchInfoError] = useState(false);

  useEffect(() => {
    (async () => {
        if (MONGO_ID_REGEX.test(cryptoId)) {
          try {
            const response = await getCryptoService({cryptoId});

            setCrypto(response);
          } catch (error: any) {
            setFetchInfoError(true);
          } finally {
            setIsLoading(false);
          }
        } else {
          navigate("/404");
        }
      }
    )();
  }, []);

  return {
    crypto,
    isLoading,
    fetchInfoError
  }
}