import AdCard from "../AdCard/AdCard"

export default function AdsList({ ads, currentUserId }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {ads?.map((ad) => (
        <AdCard ad={ad} key={ad.id} currentUserId={currentUserId} />
      ))}
    </div>
  )
}
