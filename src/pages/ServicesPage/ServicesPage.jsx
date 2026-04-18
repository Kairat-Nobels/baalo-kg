import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getService,
  updateService,
  deleteService,
  createService
} from '../../redux/slices/servicesSlice'
import ServicesTable from '../../Tables/ServicesTable/ServicesTable'
import ServiceEditModal from '../../components/ServicesEditModal/ServicesEditModal'
import DeleteModal from '../../components/DeleteModalNew/DeleteModalNew'
import { RotatingLines } from 'react-loader-spinner'
import { Button, SelectPicker } from 'rsuite'

const ServicesPage = () => {
  const dispatch = useDispatch()
  const { services, loading, error } = useSelector((state) => state.servicesReducer)

  const [selectedService, setSelectedService] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [selectedCategoryType, setSelectedCategoryType] = useState(null)

  useEffect(() => {
    dispatch(getService())
  }, [dispatch])

  const handleEdit = (category) => {
    setSelectedService(category)
    setModalOpen(true)
  }

  const handleAdd = () => {
    setSelectedService(null)
    setModalOpen(true)
  }

  const handleDelete = (category) => {
    setDeleteTarget(category)
  }

  const confirmDelete = () => {
    if (!deleteTarget) return
    dispatch(deleteService(deleteTarget.id))
    setDeleteTarget(null)
  }

  const handleSubmitModal = (updatedData, serviceId) => {
    if (!serviceId) {
      dispatch(createService(updatedData))
    } else {
      dispatch(updateService({ id: serviceId, updatedData }))
    }

    setModalOpen(false)
    setSelectedService(null)
  }

  const typeOptions = [
    ...new Set((services || []).map((item) => item.type).filter(Boolean))
  ].map((type) => ({
    label: type,
    value: type
  }))

  const filteredServices = selectedCategoryType
    ? services.filter((item) => item.type === selectedCategoryType)
    : services

  return (
    <div className="servicesPage">
      <div
        className="adminStaffHeader"
        style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}
      >
        <h3 style={{ margin: 0 }}>Категории компаний</h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <SelectPicker
            data={typeOptions}
            value={selectedCategoryType}
            onChange={setSelectedCategoryType}
            placeholder="Фильтр по типу"
            style={{ width: 220 }}
            cleanable
          />

          <Button color="orange" appearance="ghost" onClick={handleAdd}>
            + Добавить категорию
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="center">
          <RotatingLines strokeColor="grey" width="60" />
          <p>Загрузка...</p>
        </div>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <ServicesTable
          data={filteredServices}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {modalOpen && (
        <ServiceEditModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false)
            setSelectedService(null)
          }}
          serviceData={selectedService}
          onSubmit={handleSubmitModal}
        />
      )}

      {deleteTarget && (
        <DeleteModal
          open={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          deleteFunc={confirmDelete}
        />
      )}
    </div>
  )
}

export default ServicesPage
