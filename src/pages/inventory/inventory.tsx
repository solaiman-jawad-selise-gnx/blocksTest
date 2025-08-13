import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Table } from '@tanstack/react-table';
import { AdvancedTableColumnsToolbar } from 'features/inventory/component/advance-table-columns-toolbar/advance-table-columns-toolbar';
import AdvanceDataTable from 'features/inventory/component/advance-data-table/advance-data-table';
import { createAdvanceTableColumns } from 'features/inventory/component/advance-table-columns/advance-table-columns';
import { AdvanceTableFilterToolbar } from 'features/inventory/component/advance-table-filter-toolbar/advance-table-filter-toolbar';
import { AdvanceExpandRowContent } from 'features/inventory/component/advance-expand-row-content/advance-expand-row-content';
import { useGetInventories } from 'features/inventory/hooks/use-inventory';
import { InventoryItem } from 'features/inventory/types/inventory.types';

interface PaginationState {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}

export function Inventory() {
  const { t } = useTranslation();
  const columns = createAdvanceTableColumns({ t });
  const navigate = useNavigate();
  const [inventoryTableData, setInventoryTableData] = useState<InventoryItem[]>([]);
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
    totalCount: 0,
  });

  const {
    data: inventoryData,
    isLoading: isInventoryLoading,
    error: inventoryError,
  } = useGetInventories({
    pageNo: paginationState.pageIndex + 1,
    pageSize: paginationState.pageSize,
  });
  const data = inventoryData as { InventoryItems: any };

  useEffect(() => {
    if (data?.InventoryItems?.items) {
      const inventoryDataMap = data.InventoryItems.items.map((item: InventoryItem) => ({
        ItemId: item.ItemId,
        Category: item.Category,
        CreatedBy: item.CreatedBy,
        CreatedDate: item.CreatedDate,
        IsDeleted: item.IsDeleted,
        ItemImageFileId: item.ItemImageFileId,
        ItemImageFileIds: item.ItemImageFileIds,
        ItemLoc: item.ItemLoc,
        ItemName: item.ItemName,
        Language: item.Language,
        LastUpdatedBy: item.LastUpdatedBy,
        LastUpdatedDate: item.LastUpdatedDate,
        OrganizationIds: item.OrganizationIds,
        Price: item.Price,
        Status: item.Status,
        Stock: item.Stock,
        Supplier: item.Supplier,
        Tags: item.Tags,
        EligibleWarranty: item.EligibleWarranty,
        EligibleReplacement: item.EligibleReplacement,
        Discount: item.Discount,
      }));
      setInventoryTableData(inventoryDataMap);
      setPaginationState((prev) => ({
        ...prev,
        totalCount: data.InventoryItems.totalCount ?? 0,
      }));
    }
  }, [data]);

  const handlePaginationChange = useCallback(
    (newPagination: { pageIndex: number; pageSize: number }) => {
      setPaginationState((prev) => ({
        ...prev,
        pageIndex: newPagination.pageIndex,
        pageSize: newPagination.pageSize,
      }));
    },
    []
  );

  const handleInventoryDetails = (item: InventoryItem) => {
    navigate(`/inventory/${item.ItemId}`);
  };

  const renderColumnsToolbar = (table: Table<InventoryItem>) => (
    <AdvancedTableColumnsToolbar
      disabledColumns={['ItemName', 'Stock', 'Price', 'Status']}
      table={table}
      title="INVENTORY"
    />
  );

  const renderExpandRowContent = (rowId: string, colSpan: number) => (
    <AdvanceExpandRowContent rowId={rowId} colSpan={colSpan} data={inventoryTableData} />
  );

  const renderFilterToolbar = (table: Table<InventoryItem>) => (
    <AdvanceTableFilterToolbar table={table} />
  );

  return (
    <div className="flex w-full flex-col">
      <AdvanceDataTable
        data={inventoryTableData}
        columns={columns}
        onRowClick={handleInventoryDetails}
        isLoading={isInventoryLoading}
        error={inventoryError instanceof Error ? inventoryError : null}
        columnsToolbar={renderColumnsToolbar}
        filterToolbar={renderFilterToolbar}
        expandRowContent={renderExpandRowContent}
        pagination={{
          pageIndex: paginationState.pageIndex,
          pageSize: paginationState.pageSize,
          totalCount: paginationState.totalCount,
        }}
        manualPagination={true}
        columnPinningConfig={{ left: ['select', 'ItemName'] }}
        onPaginationChange={handlePaginationChange}
      />
    </div>
  );
}
