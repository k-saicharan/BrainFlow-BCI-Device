// Application data
const appData = {
    device: {
        name: "BrainFlow Headphones",
        description: "Revolutionary non-invasive BCI device designed like premium headphones, enabling thought-controlled interaction with digital devices",
        features: ["14-channel EEG sensors", "Wireless connectivity", "9-hour battery life", "Dry electrode technology", "Real-time signal processing"],
        targetPrice: "$299-$499"
    },
    marketData: {
        currentSize: "$2.94 billion (2025)",
        projectedSize: "$12.40 billion (2034)", 
        cagr: "17.35%",
        growthData: [
            {year: 2024, value: 2.62},
            {year: 2025, value: 2.94},
            {year: 2030, value: 6.52},
            {year: 2033, value: 8.73},
            {year: 2034, value: 12.40}
        ]
    },
    competitors: [
        {
            name: "BrainFlow Headphones",
            price: "$299-$499",
            channels: 14,
            type: "Consumer",
            safety: "Non-invasive",
            usability: "Intuitive",
            signalQuality: "High",
            applications: "Smart devices, Gaming, Accessibility"
        },
        {
            name: "Emotiv EPOC X",
            price: "$849-$1,199",
            channels: 14,
            type: "Research/Consumer",
            safety: "Non-invasive",
            usability: "High training required",
            signalQuality: "Good",
            applications: "Research, Gaming, Healthcare"
        },
        {
            name: "OpenBCI Galea", 
            price: "$2,000+",
            channels: "Multiple sensors",
            type: "Research/Developer",
            safety: "Non-invasive",
            usability: "Developer-focused",
            signalQuality: "Excellent",
            applications: "Research, AR/VR, Development"
        },
        {
            name: "NeuroSky",
            price: "$99-$199", 
            channels: 1,
            type: "Consumer",
            safety: "Non-invasive",
            usability: "Easy",
            signalQuality: "Basic",
            applications: "Gaming, Meditation, Basic control"
        },
        {
            name: "Neuralink",
            price: "TBD (Clinical)",
            channels: "1000+",
            type: "Medical/Invasive",
            safety: "Surgical implant",
            usability: "Medical supervision",
            signalQuality: "Excellent",
            applications: "Medical restoration, Communication"
        }
    ],
    timeline: [
        {year: 1924, event: "Hans Berger discovers EEG", description: "First recording of human brain electrical activity using electrodes placed on the scalp, laying the foundation for non-invasive brain monitoring."},
        {year: 1973, event: "Term 'BCI' coined", description: "Jacques Vidal introduces the brain-computer interface concept and demonstrates the first real-time EEG-based computer control system."},
        {year: 1988, event: "First EEG robot control", description: "Non-invasive EEG signals successfully used to control a physical robot, proving the viability of thought-controlled devices."},
        {year: 1998, event: "First human brain implant", description: "Initial invasive BCI implanted in a human brain, marking the beginning of clinical BCI applications."},
        {year: 2005, event: "Monkey controls robotic arm", description: "Major breakthrough demonstrating high-precision BCI motor control, paving the way for prosthetic applications."},
        {year: 2009, event: "Emotiv EPOC launched", description: "First consumer-grade wireless EEG headset becomes commercially available, making BCI accessible to researchers and enthusiasts."},
        {year: 2016, event: "Open-source BCI board", description: "Affordable smartphone-compatible BCI development board released, democratizing access to BCI technology."},
        {year: 2024, event: "OpenBCI Galea shipped", description: "Advanced multi-sensor BCI platform with AR/VR integration begins shipping to developers worldwide."},
        {year: 2025, event: "Present day", description: "Global BCI market reaches $2.94 billion with increasing consumer interest and technological maturity."},
        {year: 2030, event: "Projected milestone", description: "Market expansion expected to reach $6.52 billion driven by healthcare applications and consumer adoption."},
        {year: 2034, event: "Future projection", description: "Market forecasted at $12.40 billion with mainstream adoption across multiple industries."}
    ]
};

// Poll data with more realistic starting values
let pollData = {
    yes: 156,
    no: 89,
    maybe: 134
};

let currentSortColumn = null;
let sortDirection = 'asc';

// DOM elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modal-close');
const modalBody = document.getElementById('modal-body');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeDeviceShowcase();
    initializeEEGDiagram();
    initializeComparisonTable();
    initializeApplications();
    initializeTimeline();
    initializeMarketChart();
    initializePoll();
    initializeFutureTimeline();
    initializeScrollEffects();
});

// Navigation functionality
function initializeNavigation() {
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            // Close mobile menu if open
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect with throttling
    let ticking = false;
    function updateNavbar() {
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(31, 33, 33, 0.98)';
                navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(31, 33, 33, 0.95)';
                navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.04)';
            }
        }
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
}

// Smooth scroll function with better performance
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Device showcase functionality
function initializeDeviceShowcase() {
    const expandBtn = document.getElementById('expand-btn');
    const deviceImg = document.getElementById('device-img');

    if (expandBtn) {
        expandBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            showModal('device-details');
        });
    }

    if (deviceImg) {
        deviceImg.addEventListener('click', function() {
            showModal('device-details');
        });
    }
}

// EEG diagram interactivity
function initializeEEGDiagram() {
    const eegPoints = document.querySelectorAll('.eeg-point');
    
    eegPoints.forEach(point => {
        point.addEventListener('mouseenter', function() {
            const tooltip = this.querySelector('.eeg-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '1';
            }
        });

        point.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.eeg-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '0';
            }
        });

        point.addEventListener('click', function(e) {
            e.stopPropagation();
            const info = this.getAttribute('data-info');
            showModal('eeg-info', info);
        });
    });
}

// Comparison table functionality
function initializeComparisonTable() {
    populateComparisonTable();
    
    // Add sorting functionality
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const th = this.parentElement;
            const column = th.getAttribute('data-column');
            sortTable(column);
        });
    });
}

function populateComparisonTable() {
    const tbody = document.getElementById('comparison-tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';

    appData.competitors.forEach(competitor => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${competitor.name}</strong></td>
            <td>${competitor.price}</td>
            <td><span class="status status--${competitor.safety === 'Non-invasive' ? 'success' : 'warning'}">${competitor.safety}</span></td>
            <td>${competitor.usability}</td>
            <td>${competitor.signalQuality}</td>
            <td>${competitor.applications}</td>
        `;
        tbody.appendChild(row);
    });
}

function sortTable(column) {
    const tbody = document.getElementById('comparison-tbody');
    if (!tbody) return;
    
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const columnIndex = getColumnIndex(column);
    
    if (currentSortColumn === column) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        sortDirection = 'asc';
        currentSortColumn = column;
    }
    
    rows.sort((a, b) => {
        const aValue = a.cells[columnIndex].textContent.trim().toLowerCase();
        const bValue = b.cells[columnIndex].textContent.trim().toLowerCase();
        
        const comparison = aValue.localeCompare(bValue, undefined, { numeric: true });
        return sortDirection === 'asc' ? comparison : -comparison;
    });

    // Clear and repopulate tbody
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
    
    // Update sort button indicators
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.textContent = '↕';
    });
    
    const currentBtn = document.querySelector(`[data-column="${column}"] .sort-btn`);
    if (currentBtn) {
        currentBtn.textContent = sortDirection === 'asc' ? '↑' : '↓';
    }
}

function getColumnIndex(column) {
    const columns = ['name', 'price', 'safety', 'usability', 'signalQuality', 'applications'];
    return columns.indexOf(column);
}

// Applications functionality
function initializeApplications() {
    const applicationCards = document.querySelectorAll('.application-card');
    const galleryBtn = document.getElementById('gallery-btn');
    const galleryImg = document.getElementById('gallery-img');

    applicationCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            showModal('application-details', category);
        });
    });

    if (galleryBtn) {
        galleryBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            showModal('applications-gallery');
        });
    }

    if (galleryImg) {
        galleryImg.addEventListener('click', function() {
            showModal('applications-gallery');
        });
    }
}

// Timeline functionality
function initializeTimeline() {
    const timelineContainer = document.getElementById('timeline');
    if (!timelineContainer) return;
    
    timelineContainer.innerHTML = '';

    appData.timeline.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item fade-in';
        timelineItem.style.animationDelay = `${index * 0.1}s`;
        
        timelineItem.innerHTML = `
            <div class="timeline-content" data-year="${item.year}">
                <div class="timeline-year">${item.year}</div>
                <div class="timeline-event">${item.event}</div>
                <div class="timeline-description">${item.description}</div>
            </div>
        `;

        timelineItem.addEventListener('click', function() {
            showModal('timeline-details', item);
        });

        timelineContainer.appendChild(timelineItem);
    });
}

// Market chart functionality
function initializeMarketChart() {
    const chartContainer = document.getElementById('chart-interactive');
    if (!chartContainer) return;
    
    // Add interactive points to the market chart
    const chartPoints = [
        {x: '15%', y: '85%', year: 2024, value: '$2.62B'},
        {x: '25%', y: '80%', year: 2025, value: '$2.94B'},
        {x: '55%', y: '50%', year: 2030, value: '$6.52B'},
        {x: '75%', y: '35%', year: 2033, value: '$8.73B'},
        {x: '85%', y: '15%', year: 2034, value: '$12.40B'}
    ];

    chartPoints.forEach(point => {
        const chartPoint = document.createElement('div');
        chartPoint.className = 'chart-point';
        chartPoint.style.left = point.x;
        chartPoint.style.top = point.y;
        chartPoint.title = `${point.year}: ${point.value}`;
        
        chartPoint.addEventListener('click', function() {
            showModal('market-details', point);
        });

        chartContainer.appendChild(chartPoint);
    });
}

// Poll functionality
function initializePoll() {
    const pollOptions = document.querySelectorAll('.poll-option');
    const pollResults = document.getElementById('poll-results');

    pollOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedOption = this.getAttribute('data-option');
            
            // Remove previous selections
            pollOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Mark current selection
            this.classList.add('selected');
            
            // Update poll data (simulate vote)
            updatePollData(selectedOption);
            
            // Show results with animation
            displayPollResults();
        });
    });

    // Display initial results
    displayPollResults();
}

function updatePollData(option) {
    // Simulate adding a vote
    if (pollData[option] !== undefined) {
        pollData[option]++;
    }
}

function displayPollResults() {
    const pollResults = document.getElementById('poll-results');
    if (!pollResults) return;
    
    const total = pollData.yes + pollData.no + pollData.maybe;
    
    const results = [
        {label: 'Yes, with proper safeguards', value: pollData.yes, key: 'yes'},
        {label: 'No, too risky', value: pollData.no, key: 'no'},
        {label: 'Maybe, need more information', value: pollData.maybe, key: 'maybe'}
    ];

    pollResults.innerHTML = '<h4>Current Results:</h4>';
    
    results.forEach(result => {
        const percentage = Math.round((result.value / total) * 100);
        const resultDiv = document.createElement('div');
        resultDiv.className = 'poll-result';
        resultDiv.innerHTML = `
            <div class="poll-result-info">
                <span>${result.label}</span>
                <span><strong>${percentage}%</strong> (${result.value} votes)</span>
            </div>
            <div class="poll-bar" style="width: 0%; background: var(--color-primary);"></div>
        `;
        pollResults.appendChild(resultDiv);
        
        // Animate the bar
        setTimeout(() => {
            const bar = resultDiv.querySelector('.poll-bar');
            if (bar) {
                bar.style.width = `${percentage}%`;
            }
        }, 100);
    });
}

// Future timeline functionality
function initializeFutureTimeline() {
    const futureMilestones = document.querySelectorAll('.future-milestone');
    
    futureMilestones.forEach(milestone => {
        milestone.addEventListener('click', function() {
            const year = this.getAttribute('data-year') || this.querySelector('h4')?.textContent || 'Future';
            const content = this.innerHTML;
            showModal('future-details', {year, content});
        });
    });
}

// Scroll effects with intersection observer
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // Observe cards and other elements
    document.querySelectorAll('.application-card, .challenge-card, .ethics-card, .prediction').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
}

// Modal functionality
function showModal(type, data = null) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    
    if (!modal || !modalBody) return;
    
    let content = '';

    switch(type) {
        case 'device-details':
            content = generateDeviceDetailsContent();
            break;
        case 'eeg-info':
            content = generateEEGInfoContent(data);
            break;
        case 'application-details':
            content = generateApplicationDetailsContent(data);
            break;
        case 'applications-gallery':
            content = generateApplicationsGalleryContent();
            break;
        case 'timeline-details':
            content = generateTimelineDetailsContent(data);
            break;
        case 'market-details':
            content = generateMarketDetailsContent(data);
            break;
        case 'future-details':
            content = generateFutureDetailsContent(data);
            break;
        default:
            content = '<p>Content not available</p>';
    }

    modalBody.innerHTML = content;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Focus trap
    modal.focus();
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Modal content generators
function generateDeviceDetailsContent() {
    return `
        <h2>BrainFlow Headphones - Detailed Specifications</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 1.5rem;">
            <div>
                <h3>Technical Specifications</h3>
                <ul style="list-style: none; padding: 0;">
                    <li style="margin-bottom: 0.5rem;"><strong>Sensors:</strong> 14-channel dry EEG electrodes</li>
                    <li style="margin-bottom: 0.5rem;"><strong>Sampling Rate:</strong> 256 Hz per channel</li>
                    <li style="margin-bottom: 0.5rem;"><strong>Battery Life:</strong> 9 hours continuous use</li>
                    <li style="margin-bottom: 0.5rem;"><strong>Connectivity:</strong> Bluetooth 5.2, Wi-Fi</li>
                    <li style="margin-bottom: 0.5rem;"><strong>Weight:</strong> 320g (11.3 oz)</li>
                    <li style="margin-bottom: 0.5rem;"><strong>Charging:</strong> USB-C, 2-hour full charge</li>
                </ul>
            </div>
            <div>
                <h3>Key Features</h3>
                <ul style="list-style: none; padding: 0;">
                    <li style="margin-bottom: 0.5rem;">✓ Real-time signal processing</li>
                    <li style="margin-bottom: 0.5rem;">✓ Adaptive noise cancellation</li>
                    <li style="margin-bottom: 0.5rem;">✓ Machine learning algorithms</li>
                    <li style="margin-bottom: 0.5rem;">✓ Premium audio quality</li>
                    <li style="margin-bottom: 0.5rem;">✓ Ergonomic design</li>
                    <li style="margin-bottom: 0.5rem;">✓ Medical-grade materials</li>
                </ul>
            </div>
        </div>
        <div style="margin-top: 2rem;">
            <h3>Applications</h3>
            <p>The BrainFlow Headphones enable seamless control of smartphones, computers, smart home devices, and gaming systems through thought alone. Perfect for accessibility applications, productivity enhancement, and immersive entertainment experiences.</p>
            <p style="margin-top: 1rem;"><strong>Target Price:</strong> ${appData.device.targetPrice}</p>
        </div>
    `;
}

function generateEEGInfoContent(component) {
    const eegInfo = {
        'EEG Sensors': 'Advanced dry electrodes capture brain signals without the need for conductive gel, providing comfortable long-term wear while maintaining signal quality. The 14-channel configuration allows for comprehensive monitoring of various brain regions.',
        'Signal Processor': 'Dedicated ARM Cortex-M4 processor handles real-time signal filtering, artifact removal, and feature extraction with sub-millisecond latency. Advanced algorithms ensure reliable signal interpretation even in noisy environments.',
        'Neural Interface': 'Machine learning algorithms trained on diverse neural patterns interpret user intentions with 95%+ accuracy after brief calibration. The system adapts to individual neural signatures for optimal performance.'
    };

    return `
        <h2>${component}</h2>
        <p style="font-size: 1.1rem; line-height: 1.6; margin-top: 1.5rem;">
            ${eegInfo[component] || 'Information about this component is not available.'}
        </p>
        <div style="margin-top: 2rem;">
            <h3>Technical Details</h3>
            <p>EEG (Electroencephalography) technology measures electrical activity in the brain through sensors placed on the scalp. Our advanced implementation uses proprietary algorithms to enhance signal quality and reduce interference from external sources.</p>
            <ul style="margin-top: 1rem;">
                <li>High-resolution signal acquisition (256 Hz per channel)</li>
                <li>Real-time artifact detection and removal</li>
                <li>Adaptive filtering for noise reduction</li>
                <li>Machine learning-based pattern recognition</li>
            </ul>
        </div>
    `;
}

function generateApplicationDetailsContent(category) {
    const applications = {
        accessibility: {
            title: 'Accessibility Applications',
            description: 'Empowering individuals with disabilities through thought-controlled technology',
            details: [
                'Wheelchair navigation and control systems for enhanced mobility',
                'Communication devices for non-verbal individuals with ALS or stroke',
                'Environmental control for smart homes and IoT devices',
                'Prosthetic limb control with neural feedback',
                'Computer cursor and keyboard control for paralyzed users',
                'Emergency alert systems activated by thought patterns'
            ]
        },
        gaming: {
            title: 'Gaming & Entertainment',
            description: 'Immersive experiences through direct neural control',
            details: [
                'Character movement and action control in video games',
                'Emotion-responsive gameplay mechanics that adapt to player state',
                'VR/AR environment manipulation through thought commands',
                'Multi-player neural competitions and brain-training games',
                'Biofeedback training games for stress management',
                'Live streaming integration showing neural activity to viewers'
            ]
        },
        'smart-home': {
            title: 'Smart Home Integration',
            description: 'Effortless control of connected devices throughout your home',
            details: [
                'Lighting and ambiance control based on mood and preference',
                'Temperature and climate management through thought commands',
                'Security system activation and monitoring',
                'Entertainment system control including TV, music, and streaming',
                'Kitchen appliance operation for cooking assistance',
                'Voice assistant integration for hands-free interaction'
            ]
        },
        healthcare: {
            title: 'Healthcare Applications',
            description: 'Therapeutic and diagnostic capabilities for medical use',
            details: [
                'Stroke rehabilitation protocols with real-time feedback',
                'Cognitive training programs for dementia and Alzheimer\'s',
                'Mental health monitoring and intervention systems',
                'Neurofeedback therapy sessions for ADHD and anxiety',
                'Sleep disorder analysis and treatment guidance',
                'Attention and focus training for educational applications'
            ]
        }
    };

    const app = applications[category] || applications.accessibility;
    
    return `
        <h2>${app.title}</h2>
        <p style="font-size: 1.1rem; margin-bottom: 2rem;">${app.description}</p>
        <h3>Specific Use Cases</h3>
        <ul style="margin-top: 1rem;">
            ${app.details.map(detail => `<li style="margin-bottom: 0.8rem;">${detail}</li>`).join('')}
        </ul>
        <div style="margin-top: 2rem; padding: 1.5rem; background: var(--color-secondary); border-radius: 8px;">
            <p><strong>Impact:</strong> These applications can significantly improve quality of life for millions of users, providing independence, entertainment, and therapeutic benefits through intuitive brain-computer interaction. The technology represents a major step forward in assistive technology and human augmentation.</p>
        </div>
    `;
}

function generateApplicationsGalleryContent() {
    return `
        <h2>BCI Applications Gallery</h2>
        <p style="margin-bottom: 2rem;">Explore the transformative potential of brain-computer interface technology across various domains.</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
            <div style="text-align: center; padding: 1.5rem; background: var(--color-secondary); border-radius: 12px; border: 1px solid var(--color-border);">
                <h4 style="color: var(--color-primary); margin-bottom: 1rem;">Accessibility Revolution</h4>
                <p>Wheelchair navigation, prosthetic control, communication aids for individuals with mobility and speech impairments.</p>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: var(--color-secondary); border-radius: 12px; border: 1px solid var(--color-border);">
                <h4 style="color: var(--color-primary); margin-bottom: 1rem;">Gaming Innovation</h4>
                <p>Thought-controlled characters, immersive VR environments, competitive neural gaming tournaments.</p>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: var(--color-secondary); border-radius: 12px; border: 1px solid var(--color-border);">
                <h4 style="color: var(--color-primary); margin-bottom: 1rem;">Smart Living</h4>
                <p>Home automation, IoT device control, ambient intelligence responding to thoughts and emotions.</p>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: var(--color-secondary); border-radius: 12px; border: 1px solid var(--color-border);">
                <h4 style="color: var(--color-primary); margin-bottom: 1rem;">Healthcare Transformation</h4>
                <p>Rehabilitation therapy, cognitive training, mental health monitoring, and neurofeedback treatments.</p>
            </div>
        </div>
        <div style="margin-top: 2rem; text-align: center;">
            <p style="color: var(--color-text-secondary); font-style: italic;">
                The future of human-computer interaction is here. Experience the power of thought-controlled technology that adapts to your needs and enhances your capabilities.
            </p>
        </div>
    `;
}

function generateTimelineDetailsContent(item) {
    return `
        <h2>${item.year} - ${item.event}</h2>
        <p style="font-size: 1.1rem; margin: 1.5rem 0; line-height: 1.6;">${item.description}</p>
        <div style="margin-top: 2rem;">
            <h3>Historical Context</h3>
            <p>This milestone represents a significant advancement in brain-computer interface technology, contributing to our current understanding and capabilities in neural signal processing and human-computer interaction.</p>
            ${item.year <= 2025 ? `
                <p style="margin-top: 1rem;">This achievement has been crucial in developing the foundation for modern BCI systems, including consumer-grade devices like the BrainFlow Headphones.</p>
            ` : ''}
        </div>
        ${item.year > 2025 ? `
            <div style="margin-top: 1.5rem; padding: 1rem; background: var(--color-secondary); border-radius: 8px; border-left: 4px solid var(--color-primary);">
                <p><strong>Future Projection:</strong> This represents our projected timeline for BCI technology advancement based on current research trends, technological capabilities, and market developments. Actual timelines may vary based on regulatory approval and breakthrough discoveries.</p>
            </div>
        ` : ''}
    `;
}

function generateMarketDetailsContent(point) {
    return `
        <h2>Market Data - ${point.year}</h2>
        <div style="text-align: center; margin: 2rem 0;">
            <div style="font-size: 3.5rem; color: var(--color-primary); font-weight: bold; margin-bottom: 0.5rem;">${point.value}</div>
            <p style="font-size: 1.2rem; color: var(--color-text-secondary);">Global BCI Market Size</p>
        </div>
        <div style="margin-top: 2rem;">
            <h3>Market Analysis</h3>
            <p>The brain-computer interface market is experiencing unprecedented growth driven by technological advancements, increasing healthcare needs, and growing consumer interest in neural technologies.</p>
            <div style="margin-top: 1.5rem;">
                <h4>Key Growth Drivers:</h4>
                <ul style="margin-top: 0.5rem;">
                    <li>Aging global population requiring assistive technologies</li>
                    <li>Advances in machine learning and signal processing algorithms</li>
                    <li>Increased investment in neurotechnology research and development</li>
                    <li>Growing awareness of accessibility solutions and inclusive design</li>
                    <li>Consumer electronics integration potential and mass market appeal</li>
                    <li>Healthcare applications for rehabilitation and cognitive enhancement</li>
                </ul>
            </div>
            <div style="margin-top: 1.5rem;">
                <h4>Market Segments:</h4>
                <ul>
                    <li><strong>Healthcare:</strong> Largest segment focused on medical applications</li>
                    <li><strong>Consumer Electronics:</strong> Rapidly growing gaming and smart device control</li>
                    <li><strong>Military & Defense:</strong> Advanced human-machine interfaces</li>
                    <li><strong>Education:</strong> Cognitive training and learning enhancement tools</li>
                </ul>
            </div>
        </div>
    `;
}

function generateFutureDetailsContent(data) {
    return `
        <h2>Future Milestone - ${data.year}</h2>
        <div style="margin-top: 1.5rem; font-size: 1.1rem;">
            ${data.content.replace(/<h4>/g, '<h3>').replace(/<\/h4>/g, '</h3>')}
        </div>
        <div style="margin-top: 2rem;">
            <h3>Projected Impact</h3>
            <p>This milestone represents a significant step forward in making brain-computer interface technology more accessible, practical, and integrated into daily life. The convergence of artificial intelligence, hardware miniaturization, and neural science will enable unprecedented human-computer collaboration.</p>
            <ul style="margin-top: 1rem;">
                <li>Enhanced quality of life for individuals with disabilities</li>
                <li>New forms of entertainment and creative expression</li>
                <li>Improved productivity through direct neural interfaces</li>
                <li>Revolutionary healthcare and rehabilitation approaches</li>
                <li>Ethical considerations and privacy frameworks</li>
            </ul>
        </div>
        <div style="margin-top: 1.5rem; padding: 1rem; background: var(--color-secondary); border-radius: 8px; border-left: 4px solid var(--color-primary);">
            <p><strong>Note:</strong> These projections are based on current technological trends, research developments, and market analysis. Actual timelines may vary based on regulatory approval, technological breakthroughs, funding availability, and market adoption rates.</p>
        </div>
    `;
}

// Modal event listeners
document.addEventListener('DOMContentLoaded', function() {
    const modalClose = document.getElementById('modal-close');
    const modal = document.getElementById('modal');

    if (modalClose) {
        modalClose.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal();
        });
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            closeModal();
        }
    });
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for global access
window.scrollToSection = scrollToSection;
window.showModal = showModal;
window.closeModal = closeModal;