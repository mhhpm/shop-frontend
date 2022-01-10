export default function Comment({hoten, noidung}){
    return (<div class="mb-3">
    <div class="px-2" style={{ color: 'orange', fontWeight: 'bold' }}>
      {hoten}
    </div>
    <div class="px-4"> {noidung}</div>
  </div>)
}