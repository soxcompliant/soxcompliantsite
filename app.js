document.getElementById('artistForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const artistName = document.getElementById('artistName').value;
  fetchTourDates(artistName);
});

function fetchTourDates(artistName) {
  const encodedArtistName = encodeURIComponent(artistName);
  const url = `https://rest.bandsintown.com/artists/${encodedArtistName}/events?app_id=squarespace-moose-pelican-53kl&date=upcoming`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayTourDates(data);
    })
    .catch(error => {
      console.error('Error fetching tour dates:', error);
      document.getElementById('results').innerHTML = '<p>Sorry, there was an error fetching the tour dates. Please try again.</p>';
    });
}

function displayTourDates(events) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  if (events.length === 0) {
    resultsDiv.innerHTML = '<p>No upcoming tour dates found for this artist.</p>';
    return;
  }

  const ul = document.createElement('ul');

  events.forEach(event => {
    const li = document.createElement('li');
    li.innerHTML = `
      <h2>${event.lineup[0]}</h2>
      <p>Location: ${event.venue.city}, ${event.venue.region}</p>
      <p>Date: ${new Date(event.starts_at).toLocaleDateString()}</p>
      <a href="${event.url}" target="_blank">Buy Tickets</a>
    `;
    ul.appendChild(li);
  });

  resultsDiv.appendChild(ul);
}

