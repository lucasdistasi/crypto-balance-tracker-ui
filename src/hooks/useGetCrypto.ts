import {useEffect, useState} from "react";
import {getCryptoService} from "../services/cryptoService";
import {useNavigate, useParams} from "react-router-dom";
import {UUID_REGEX} from "../constants/Constants";
import {UserCryptoResponse} from "../model/response/usercrypto/UserCryptoResponse";

export function useGetCrypto() {

  const navigate = useNavigate();
  const params = useParams();
  const cryptoId: string = params.id!!;

  const [userCrypto, setUserCrypto] = useState<UserCryptoResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const [fetchInfoError, setFetchInfoError] = useState(false);

  useEffect(() => {
    (async () => {
        if (UUID_REGEX.test(cryptoId)) {
          try {
            const response = await getCryptoService(cryptoId);

            setUserCrypto(response);
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
    userCrypto,
    isLoading,
    fetchInfoError
  }
}