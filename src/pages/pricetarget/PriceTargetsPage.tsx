import withScrollToTop from "../../hoc/withScrollToTop";
import React, {Fragment, useEffect, useRef, useState} from "react";
import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import {useNavigate} from "react-router-dom";
import {PagePriceTargetResponse} from "../../model/response/pricetarget/PagePriceTargetResponse";
import {SortType} from "../../enums/SortType";
import {deletePriceTarget, retrievePriceTargetsByPage} from "../../services/priceTargetService";
import AddNewButton from "../../components/buttons/AddNewButton";
import TableSkeleton from "../../components/skeletons/TableSkeleton";
import ErrorAlert from "../../components/page/ErrorAlert";
import LoadMoreButton from "../../components/buttons/LoadMoreButton";
import {TableColumnTitle} from "../../components/table/TableColumnTitle";
import {TableColumnContent} from "../../components/table/TableColumnContent";
import EditButton from "../../components/table/EditButton";
import DeleteButton from "../../components/table/DeleteButton";
import {SortableTableColumnTitle} from "../../components/table/SortableTableColumnTitle";
import {PriceTargetResponse} from "../../model/response/pricetarget/PriceTargetResponse";

const PriceTargetsPage = () => {

  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [sortType, setSortType] = useState(SortType.ASCENDING);
  const [isLoadingPriceTargets, setIsLoadingPriceTargets] = useState(true);
  const [isLoadingMorePriceTargets, setIsLoadingMorePriceTargets] = useState(false);
  const [fetchPriceTargetsError, setFetchPriceTargetsError] = useState(false);
  const [pagePriceTargetsPageResponse, setPagePriceTargetsPageResponse] = useState<PagePriceTargetResponse>({
    page: 0,
    totalPages: 0,
    hasNextPage: false,
    targets: []
  });
  const priceTargetsRef = useRef<Array<PriceTargetResponse>>([]);

  useEffect(() => {
    (async () => {
        try {
          const pagePriceTargetResponse: PagePriceTargetResponse = await retrievePriceTargetsByPage(page)
            .then(response => response.data);
          setPagePriceTargetsPageResponse(pagePriceTargetResponse);
          priceTargetsRef.current = pagePriceTargetResponse.targets;
        } catch (error: any) {
          setFetchPriceTargetsError(true);
        } finally {
          setIsLoadingPriceTargets(false);
        }
      }
    )();
  }, []);

  const deleteTarget = async (priceTargetId: string) => {
    try {
      await deletePriceTarget(priceTargetId)
        .then(_ => setPage(0));
      const pagePriceTargetResponse: PagePriceTargetResponse = await retrievePriceTargetsByPage(0)
        .then(response => response.data);
      setPagePriceTargetsPageResponse(pagePriceTargetResponse);
      priceTargetsRef.current = pagePriceTargetResponse.targets;
      setSortType(sortType === SortType.ASCENDING ? SortType.DESCENDING : SortType.ASCENDING);
    } catch (error: any) {
      navigate("/error");
    }
  }

  const loadMorePriceTargets = async () => {
    setIsLoadingMorePriceTargets(true);
    const nextPage = page + 1;
    setPage(nextPage);

    try {
      const pagePriceTargetResponse: PagePriceTargetResponse = await retrievePriceTargetsByPage(nextPage)
        .then(response => response.data);
      setPagePriceTargetsPageResponse({
        ...pagePriceTargetResponse,
        targets: [...pagePriceTargetsPageResponse.targets, ...pagePriceTargetResponse.targets]
      });
      priceTargetsRef.current = [...priceTargetsRef.current, ...pagePriceTargetResponse.targets];
      sortPriceTargets();
    } catch (err) {
      setFetchPriceTargetsError(true);
    } finally {
      setIsLoadingMorePriceTargets(false);
    }
  }

  const sortPriceTargets = () => {
    setSortType(sortType === SortType.ASCENDING ? SortType.DESCENDING : SortType.ASCENDING);
    priceTargetsRef.current = priceTargetsRef.current.toSorted((first, second) => sortByDistanceToZero(first.change, second.change));
  }

  function sortByDistanceToZero(first: number, second: number) {
    return sortType === SortType.ASCENDING ?
      Math.abs(first) - Math.abs(second) :
      Math.abs(second) - Math.abs(first);
  }

  return (
    <Fragment>
      <Navbar/>
      <div className="flex flex-col items-center min-h-screen">
        <AddNewButton text="+ Add New Price Target" href="/price-target"/>

        {
          isLoadingPriceTargets && !fetchPriceTargetsError &&
          <TableSkeleton/>
        }

        {
          fetchPriceTargetsError && !isLoadingPriceTargets &&
          <ErrorAlert message="Error retrieving price targets"/>
        }

        {
          !fetchPriceTargetsError && !isLoadingPriceTargets && priceTargetsRef.current?.length > 0 &&
          <div className="relative overflow-x-auto rounded-lg w-11/12 mt-5">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-900 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <TableColumnTitle title="Crypto"
                                  additionalClasses="text-center"/>
                <TableColumnTitle title="Target"
                                  additionalClasses="text-center"/>
                <TableColumnTitle title="Current Price"
                                  additionalClasses="text-center whitespace-nowrap"/>
                <SortableTableColumnTitle title="Change"
                                          additionalClasses="text-center"
                                          sortFunction={sortPriceTargets}/>
                <TableColumnTitle title="Action"
                                  additionalClasses="text-center"/>
              </tr>
              </thead>
              <tbody className="w-full">
              {
                priceTargetsRef.current.map(target => {
                  return (
                    <tr
                      className="bg-gray-100 border-b dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700"
                      key={target.priceTargetId}>
                      <TableColumnContent content={target.cryptoName}
                                          rowScope={true}
                                          additionalClasses="text-center"/>
                      <TableColumnContent content={`U$D ${target.priceTarget.toString()}`}
                                          additionalClasses="text-center text-bold"/>
                      <TableColumnContent content={`U$D ${target.currentPrice.toString()}`}
                                          additionalClasses="text-center"/>
                      <TableColumnContent content={`${target.change}%`}
                                          additionalClasses="text-center"/>
                      <td className="px-6 py-4 text-center flex flex-col justify-center space-y-2 lg:space-y-0 lg:space-x-4 lg:flex-row">
                        <EditButton editLink={`/price-targets/${target.priceTargetId}`}/>
                        <DeleteButton deleteFunction={() => deleteTarget(target.priceTargetId)}
                                      deleteId={target.priceTargetId}
                                      deleteMessage={`Are you sure you want to delete this price target for ${target.cryptoName}?`}/>
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
          !fetchPriceTargetsError && !isLoadingPriceTargets && pagePriceTargetsPageResponse.hasNextPage &&
          <LoadMoreButton loadMoreCallback={() => loadMorePriceTargets()}
                          isLoadingMore={isLoadingMorePriceTargets}/>
        }
      </div>
      <Footer/>
    </Fragment>
  )
}

export default withScrollToTop(PriceTargetsPage)