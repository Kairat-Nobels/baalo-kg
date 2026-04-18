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
  const [selectedDay, setSelectedDay] = useState(null)

  useEffect(() => {
    dispatch(getService())
  }, [dispatch])

  const handleEdit = (service) => {
    setSelectedService(service)
    setModalOpen(true)
  }

  const handleAdd = () => {
    setSelectedService(null)
    setModalOpen(true)
  }

  const handleDelete = (service) => {
    setDeleteTarget(service)
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

  const dayOptions = [
    ...new Set((services || []).map(item => item.day).filter(Boolean))
  ].map(day => ({
    label: day,
    value: day
  }))

  const filteredServices = selectedDay
    ? services.filter(item => item.day === selectedDay)
    : services

  return (
    <div className="servicesPage">
      <div
        className="adminStaffHeader"
        style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}
      >
        <h3 style={{ margin: 0 }}>Расписание тренировок</h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <SelectPicker
            data={dayOptions}
            value={selectedDay}
            onChange={setSelectedDay}
            placeholder="Фильтр по дню"
            style={{ width: 220 }}
            cleanable
          />

          <Button color="orange" appearance="ghost" onClick={handleAdd}>
            + Добавить тренировку
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
