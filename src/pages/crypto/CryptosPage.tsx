import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import AddNewButton from "../../components/buttons/AddNewButton";
import withScrollToTop from "../../hoc/withScrollToTop";
import React, {useEffect, useRef, useState} from "react";
import {UserCryptoResponse} from "../../model/response/usercrypto/UserCryptoResponse";
import {PageUserCryptoResponse} from "../../model/response/usercrypto/PageUserCryptoResponse";
import {deleteCryptoService, getCryptosByPageService} from "../../services/cryptoService";
import TableSkeleton from "../../components/skeletons/TableSkeleton";
import ErrorAlert from "../../components/page/ErrorAlert";
import {SortableTableColumnTitle} from "../../components/table/SortableTableColumnTitle";
import {TableColumnTitle} from "../../components/table/TableColumnTitle";
import {TableColumnContent} from "../../components/table/TableColumnContent";
import EditButton from "../../components/table/EditButton";
import TransferButton from "../../components/table/TransferButton";
import DeleteButton from "../../components/table/DeleteButton";
import LoadMoreButton from "../../components/buttons/LoadMoreButton";
import FilterField from "../../components/commons/FilterField";

const CryptosPage = () => {

  const filteredCryptos = useRef<Array<UserCryptoResponse>>([]);
  const [pageUserCryptoResponse, setPageUserCryptoResponse] = useState<PageUserCryptoResponse>({
    page: 0,
    totalPages: 0,
    hasNextPage: false,
    cryptos: []
  });
  const [filterValue, setFilterValue] = useState("");
  const [isLoadingMoreCryptos, setIsLoadingMoreCryptos] = useState(false);
  const [page, setPage] = useState(0);
  const [error, setError] = useState(false);
  const [isLoadingCryptos, setIsLoadingCryptos] = useState(true);
  const [sortAscending, setSortAscending] = useState(true);

  useEffect(() => {
    (async () => {
        try {
          const response = await getCryptosByPageService(page);

          setPageUserCryptoResponse(response);
          filteredCryptos.current = response.cryptos;
        } catch (err) {
          setError(true);
        } finally {
          setIsLoadingCryptos(false);
        }
      }
    )();
  }, []);

  const deleteCrypto = async (cryptoId: string) => {
    try {
      await deleteCryptoService(cryptoId);

      const updatedFilteredCryptos = filteredCryptos.current.filter(crypto => crypto.id !== cryptoId);
      const updatedCryptos = pageUserCryptoResponse.cryptos.filter(crypto => crypto.id !== cryptoId);
      const {hasNextPage, page, totalPages} = pageUserCryptoResponse;

      setPageUserCryptoResponse({
        cryptos: updatedCryptos,
        hasNextPage,
        page,
        totalPages
      });
      filteredCryptos.current = updatedFilteredCryptos;
    } catch (err) {
      setError(true);
    }
  }

  const filterTable = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    filteredCryptos.current = pageUserCryptoResponse.cryptos.filter(crypto => doesMatchFilter(crypto, value));
    setFilterValue(value);
  }

  const loadMoreCryptos = async () => {
    setIsLoadingMoreCryptos(true);
    const nextPage = page + 1;
    setPage(nextPage);

    try {
      const response: PageUserCryptoResponse = await getCryptosByPageService(nextPage);
      filteredCryptos.current = [...filteredCryptos.current, ...response.cryptos.filter((crypto) => doesMatchFilter(crypto, filterValue))];

      setPageUserCryptoResponse({
        cryptos: [...pageUserCryptoResponse.cryptos, ...response.cryptos],
        hasNextPage: response.hasNextPage,
        page: response.page,
        totalPages: response.totalPages
      });
    } catch (err) {
      setError(true);
    } finally {
      setIsLoadingMoreCryptos(false);
    }
  }

  const doesMatchFilter = (userCrypto: UserCryptoResponse, value: string) => {
    return userCrypto.cryptoName.toUpperCase().startsWith(value.toUpperCase()) ||
      userCrypto.platform.toUpperCase().startsWith(value.toUpperCase());
  }

  const sortByCryptoName = () => {
    filteredCryptos.current = filteredCryptos.current.toSorted((a, b) => {
      if (a.cryptoName > b.cryptoName) {
        return sortAscending ? 1 : -1;
      }

      if (b.cryptoName > a.cryptoName) {
        return sortAscending ? -1 : 1;
      }

      return 0;
    });
    setSortAscending(!sortAscending);
  }

  const sortByPlatformName = () => {
    filteredCryptos.current = filteredCryptos.current.toSorted((a, b) => {
      if (a.platform > b.platform) {
        return sortAscending ? 1 : -1;
      }

      if (b.platform > a.platform) {
        return sortAscending ? -1 : 1;
      }

      return 0;
    });
    setSortAscending(!sortAscending);
  }

  return (
    <>
      <Navbar/>
      <div className="flex flex-col items-center min-h-screen">
        <AddNewButton text="+ Add New Crypto" href="/crypto"/>
        {
          isLoadingCryptos && !error &&
          <TableSkeleton/>
        }

        {
          error && !isLoadingCryptos &&
          <ErrorAlert message="Error retrieving cryptos"/>
        }

        {
          !error && !isLoadingCryptos && pageUserCryptoResponse?.cryptos?.length > 0 &&
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-10 w-11/12">
            <FilterField filterFunction={event => filterTable(event)}
                         placeHolder="Search by crypto or platform"/>

            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-900 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <SortableTableColumnTitle title="Crypto"
                                          additionalClasses="text-center"
                                          sortFunction={sortByCryptoName}/>
                <TableColumnTitle title="Quantity"
                                  additionalClasses="text-center"/>
                <SortableTableColumnTitle title="Platform"
                                          additionalClasses="text-center"
                                          sortFunction={sortByPlatformName}/>
                <TableColumnTitle title="Action"
                                  additionalClasses="text-center"/>
              </tr>
              </thead>
              <tbody>
              {
                filteredCryptos.current.map(crypto => {
                  const {id, cryptoName, platform, quantity} = crypto;

                  return (
                    <tr key={id}
                        className="bg-gray-100 border-b dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700">
                      <TableColumnContent content={cryptoName}
                                          rowScope={true}
                                          additionalClasses="text-center"/>
                      <TableColumnContent content={quantity.toString()}
                                          additionalClasses="text-center"/>
                      <TableColumnContent content={platform}
                                          additionalClasses="text-center"/>
                      <td className="px-6 py-4 text-center flex flex-col justify-center space-y-2 lg:space-y-0 lg:space-x-4 lg:flex-row">
                        <EditButton editLink={`/crypto/${id}`}/>
                        <TransferButton transferLink={`/transfer/${id}`}/>
                        <DeleteButton deleteFunction={() => deleteCrypto(id)}
                                      deleteId={id}
                                      deleteMessage={`Are you sure you want to delete ${cryptoName.toUpperCase()} in ${platform}?`}/>
                      </td>
                    </tr>
                  );
                })
              }
              </tbody>
            </table>
          </div>
        }

        {
          !error && !isLoadingCryptos && pageUserCryptoResponse.hasNextPage &&
          <LoadMoreButton loadMoreCallback={() => loadMoreCryptos()}
                          isLoadingMore={isLoadingMoreCryptos}/>
        }
      </div>
      <Footer/>
    </>
  );
}

export default withScrollToTop(CryptosPage)