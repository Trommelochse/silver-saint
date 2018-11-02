class StreamEvent {
	constructor(streamEvent) {
		this.data = streamEvent;
		this.name = streamEvent.en;
		this.sport = streamEvent.cri;
		this.league = 0;
		this.iconSrc = icons[streamEvent.cri] || icons.default;
		this.month = streamEvent.sd.match(/-\d\d/)[0].replace(/\D/, '').replace(/^0/, '');
		this.day = streamEvent.sd.match(/\d\d[A-Z]/)[0].replace(/\D/, '').replace(/^0/, '');
		this.startTime = streamEvent.sd.match(/\d\d:\d\d/)[0];
		this.node = this.createNode();
	}

	createNode() {		
		const container = document.createElement('div');
		container.classList.add('event-container');

		//icon
		const iconContainer = document.createElement('div');
		iconContainer.classList.add('event-icon-container');
		const icon = document.createElement('img');
		icon.setAttribute('src', this.iconSrc);
		iconContainer.appendChild(icon);
		container.appendChild(iconContainer);

		//info
		const infoContainer = document.createElement('div');
		infoContainer.classList.add('event-info-container');
			//date
			const dateContainer = document.createElement('div');
			dateContainer.classList.add('event-date-container');
			const d = document.createElement('span');
			d.innerHTML = `${this.day}/${this.month} &mdash; `;
			d.classList.add('event-date');
			dateContainer.appendChild(d);
			const t = document.createElement('span');
			t.innerHTML = `${this.startTime}`;
			t.classList.add('event-time');
			dateContainer.appendChild(t);
			infoContainer.appendChild(dateContainer);

			//name
			const nameContainer = document.createElement('div');
			nameContainer.classList.add('event-name-container');
			const name = document.createElement('span');
			name.classList.add('event-name');
			name.innerHTML = this.name;
			nameContainer.appendChild(name);

			infoContainer.appendChild(nameContainer);
		
		container.appendChild(infoContainer);

		return container;
	}
}



const icons = {
	'football': 'https://bpsh2.hs.llnwd.net/e1/echo-cdn-origin/content/nordicbet/sites/3/2017/10/football.png',
	'ice-hockey': 'https://in.betsson.com/wp-content/uploads/content/betsson/sites/3/2018/03/hockey.png',
	'basketball': 'https://bpsh2.hs.llnwd.net/e1/echo-cdn-origin/content/nordicbet/sites/3/2017/10/basketball.png',
	'baseball': 'https://bpsh2.hs.llnwd.net/e1/echo-cdn-origin/content/nordicbet/sites/3/2017/10/baseball.png',
	'default': 'https://image.ibb.co/jhejoL/youtube.png'
}

export default StreamEvent;