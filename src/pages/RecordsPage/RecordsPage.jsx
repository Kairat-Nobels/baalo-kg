import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteRecord, getRecords } from '../../redux/slices/recordSlice'
import { RotatingLines } from 'react-loader-spinner'
import RecordsTable from '../../Tables/RecordsTable/RecordsTable'
import DeleteModal from '../../components/DeleteModalNew/DeleteModalNew'
import 'rsuite/dist/rsuite.min.css'

const RecordsPage = () => {
  const dispatch = useDispatch()
  const { records, loading, error } = useSelector((state) => state.recordsReducer)
  const [deleteTarget, setDeleteTarget] = useState(null)

  useEffect(() => {
    dispatch(getRecords())
  }, [dispatch])

  return (
    <div className="adminRecords">
      <div className="adminRecordHeader">
        <h3>Заявки на добавление компании</h3>
      </div>

      {loading ? (
        <div className="center">
          <RotatingLines strokeColor="grey" width="60" />
          <p>Загрузка...</p>
        </div>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <RecordsTable
          data={records}
          onDelete={(record) => setDeleteTarget(record)}
        />
      )}

      {deleteTarget && (
        <DeleteModal
          deleteFunc={deleteRecord}
          open={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          id={deleteTarget.id}
        />
      )}
    </div>
  )
}

export default RecordsPage
