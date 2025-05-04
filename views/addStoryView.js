const AddStoryView = {
    render() {
      const form = document.getElementById('story-form');
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        // Ambil data dari form dan kirimkan ke presenter untuk diproses
        const formData = new FormData(form);
        const storyData = {
          name: formData.get('name'),
          description: formData.get('description'),
          photoUrl: formData.get('photoUrl'), // Sesuaikan jika gambar dari kamera
          location: formData.get('location'),
          latitude: formData.get('lat'),
          longitude: formData.get('lon'),
        };
        // Kirim data ke presenter atau model
      });
    }
  };
  
  export default AddStoryView;