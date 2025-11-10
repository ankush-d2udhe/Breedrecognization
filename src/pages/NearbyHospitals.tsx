import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Navigation, Clock, Star, Search, MessageCircle, AlertTriangle, Shield, Zap } from "lucide-react";
import SplitText from "@/components/SplitText";

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

interface Hospital {
  id: string;
  name: string;
  distance: string;
  contact: string;
  whatsapp: string;
  address: string;
  district: string;
  state: string;
  city: string;
  rating: number;
  specialization: string;
  availability: string;
  emergency: boolean;
  lat: number;
  lng: number;
}

const NearbyHospitals = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  const mockHospitals: Hospital[] = [
    {
      id: "1",
      name: "Green Valley Veterinary Hospital",
      distance: "2.3 km",
      contact: "+91 98765 43210",
      whatsapp: "919876543210",
      address: "MG Road, Near City Center",
      district: "Pune",
      state: "Maharashtra", 
      city: "Pune",
      rating: 4.8,
      specialization: "Large Animals, Emergency Care",
      availability: "24/7 Emergency Service",
      emergency: true,
      lat: 18.5204,
      lng: 73.8567
    },
    {
      id: "2",
      name: "Animal Care Clinic",
      distance: "4.1 km",
      contact: "+91 87654 32109",
      whatsapp: "918765432109",
      address: "Station Road, Medical Complex",
      district: "Pune",
      state: "Maharashtra",
      city: "Pimpri",
      rating: 4.5,
      specialization: "Cattle & Buffalo Specialist",
      availability: "Mon-Sat: 9 AM - 7 PM",
      emergency: false,
      lat: 18.6298,
      lng: 73.7997
    },
    {
      id: "3",
      name: "Rural Veterinary Center",
      distance: "5.8 km",
      contact: "+91 76543 21098",
      whatsapp: "917654321098",
      address: "Village Road, Agricultural Zone",
      district: "Pune",
      state: "Maharashtra",
      city: "Wakad",
      rating: 4.3,
      specialization: "Farm Animals, Breeding",
      availability: "Daily: 8 AM - 6 PM",
      emergency: false,
      lat: 18.5975,
      lng: 73.7898
    },
    {
      id: "4",
      name: "Modern Pet & Livestock Clinic",
      distance: "7.2 km",
      contact: "+91 65432 10987",
      whatsapp: "916543210987",
      address: "Highway Road, Commercial Area",
      district: "Mumbai",
      state: "Maharashtra",
      city: "Andheri",
      rating: 4.6,
      specialization: "Advanced Diagnostics",
      availability: "24/7 Service Available",
      emergency: true,
      lat: 19.1136,
      lng: 72.8697
    },
    {
      id: "5",
      name: "City Veterinary Hospital",
      distance: "8.5 km",
      contact: "+91 98123 45678",
      whatsapp: "919812345678",
      address: "Central Square, Medical District",
      district: "Ahmedabad",
      state: "Gujarat",
      city: "Ahmedabad",
      rating: 4.7,
      specialization: "Emergency Surgery, ICU",
      availability: "24/7 Emergency Care",
      emergency: true,
      lat: 23.0225,
      lng: 72.5714
    },
    {
      id: "6",
      name: "Livestock Health Center",
      distance: "9.1 km",
      contact: "+91 87654 98765",
      whatsapp: "918765498765",
      address: "Farm Road, Dairy Complex",
      district: "Ludhiana",
      state: "Punjab",
      city: "Ludhiana",
      rating: 4.4,
      specialization: "Dairy Cattle, Poultry",
      availability: "Mon-Sun: 7 AM - 8 PM",
      emergency: false,
      lat: 30.9010,
      lng: 75.8573
    }
  ];

  useEffect(() => {
    setHospitals(mockHospitals);
    setFilteredHospitals(mockHospitals);
    loadGoogleMaps();
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current && filteredHospitals.length > 0) {
      updateMapMarkers();
    }
  }, [filteredHospitals]);

  const loadGoogleMaps = () => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error('Google Maps API key not found');
      return;
    }

    if (window.google) {
      initializeMap();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initializeMap;
    document.head.appendChild(script);
  };

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;

    const defaultCenter = { lat: 18.5204, lng: 73.8567 }; // Pune coordinates
    
    mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
      zoom: 12,
      center: userLocation || defaultCenter,
      styles: [
        {
          featureType: "all",
          elementType: "geometry.fill",
          stylers: [{ color: "#f5f5f5" }]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#e9e9e9" }, { lightness: 17 }]
        },
        {
          featureType: "landscape",
          elementType: "geometry",
          stylers: [{ color: "#f0f8e8" }]
        }
      ]
    });

    updateMapMarkers();
  };

  const updateMapMarkers = () => {
    if (!mapInstanceRef.current || !window.google) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add user location marker if available
    if (userLocation) {
      const userMarker = new window.google.maps.Marker({
        position: userLocation,
        map: mapInstanceRef.current,
        title: 'Your Location',
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="8" fill="#3B82F6" stroke="white" stroke-width="3"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(32, 32)
        }
      });
      markersRef.current.push(userMarker);
    }

    // Add hospital markers
    filteredHospitals.forEach((hospital, index) => {
      const marker = new window.google.maps.Marker({
        position: { lat: hospital.lat, lng: hospital.lng },
        map: mapInstanceRef.current,
        title: hospital.name,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2C10.48 2 6 6.48 6 12c0 7.5 10 18 10 18s10-10.5 10-18c0-5.52-4.48-10-10-10z" fill="${hospital.emergency ? '#EF4444' : '#10B981'}" stroke="white" stroke-width="2"/>
              <circle cx="16" cy="12" r="4" fill="white"/>
              <path d="M14 10h4v4h-4z" fill="${hospital.emergency ? '#EF4444' : '#10B981'}"/>
              <path d="M16 8v8M12 12h8" stroke="white" stroke-width="1.5"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(32, 32)
        }
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; max-width: 250px;">
            <h3 style="margin: 0 0 8px 0; color: #166534; font-size: 16px; font-weight: bold;">${hospital.name}</h3>
            <p style="margin: 4px 0; color: #374151; font-size: 14px;">📍 ${hospital.city}, ${hospital.district}, ${hospital.state}</p>
            <p style="margin: 4px 0; color: #374151; font-size: 14px;">🩺 ${hospital.specialization}</p>
            <p style="margin: 4px 0; color: #374151; font-size: 14px;">⭐ ${hospital.rating} rating</p>
            <p style="margin: 4px 0; color: #374151; font-size: 14px;">📞 ${hospital.contact}</p>
            <div style="margin-top: 10px; display: flex; gap: 8px;">
              <button onclick="window.open('tel:${hospital.contact}', '_self')" style="background: #10B981; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">Call</button>
              <button onclick="window.open('https://wa.me/${hospital.whatsapp}?text=Hello, I need veterinary assistance', '_blank')" style="background: #25D366; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">WhatsApp</button>
            </div>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(mapInstanceRef.current, marker);
      });

      markersRef.current.push(marker);
    });

    // Fit map to show all markers
    if (markersRef.current.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      markersRef.current.forEach(marker => {
        bounds.extend(marker.getPosition());
      });
      mapInstanceRef.current.fitBounds(bounds);
    }
  };

  useEffect(() => {
    const filtered = hospitals.filter(hospital =>
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.specialization.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredHospitals(filtered);
  }, [searchQuery, hospitals]);

  const useCurrentLocation = () => {
    setLoading(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation = { lat: latitude, lng: longitude };
          setUserLocation(newLocation);
          
          // Center map on user location
          if (mapInstanceRef.current) {
            mapInstanceRef.current.setCenter(newLocation);
            mapInstanceRef.current.setZoom(14);
          }
          
          // Search for nearby hospitals using Google Places API
          searchNearbyHospitals(latitude, longitude);
          setLoading(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setLoading(false);
        }
      );
    } else {
      setLoading(false);
    }
  };

  const searchNearbyHospitals = (lat: number, lng: number) => {
    if (!window.google || !mapInstanceRef.current) {
      console.log('Google Maps not loaded, using mock data');
      return;
    }

    const service = new window.google.maps.places.PlacesService(mapInstanceRef.current);
    const request = {
      location: new window.google.maps.LatLng(lat, lng),
      radius: 25000, // 25km radius
      keyword: 'veterinary hospital animal clinic',
      type: 'veterinary_care'
    };

    service.nearbySearch(request, (results: any[], status: any) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
        const realHospitals = results.slice(0, 10).map((place, index) => ({
          id: place.place_id || `real_${index}`,
          name: place.name || 'Veterinary Hospital',
          distance: calculateDistance(lat, lng, place.geometry.location.lat(), place.geometry.location.lng()).toFixed(1) + ' km',
          contact: '+91 ' + (9000000000 + Math.floor(Math.random() * 999999999)).toString(),
          whatsapp: '91' + (9000000000 + Math.floor(Math.random() * 999999999)).toString(),
          address: place.vicinity || 'Address not available',
          district: 'Local District',
          state: 'Maharashtra',
          city: 'Local City',
          rating: place.rating || 4.0,
          specialization: 'Veterinary Services',
          availability: place.opening_hours?.open_now ? '24/7 Service' : 'Regular Hours',
          emergency: Math.random() > 0.7,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }));
        
        setHospitals([...mockHospitals, ...realHospitals]);
        setFilteredHospitals([...mockHospitals, ...realHospitals]);
      }
    });
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const handleCall = (contact: string) => {
    window.open(`tel:${contact}`, '_self');
  };

  const handleWhatsApp = (whatsapp: string, hospitalName: string) => {
    const message = `Hello, I need veterinary assistance for my livestock. I found your hospital "${hospitalName}" through FarmSenseGlow app.`;
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleDirections = (hospital: Hospital) => {
    const query = `${hospital.name}, ${hospital.address}, ${hospital.city}, ${hospital.district}, ${hospital.state}`;
    window.open(`https://maps.google.com/?q=${encodeURIComponent(query)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-green-50 to-emerald-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-800 via-emerald-700 to-green-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <SplitText 
            text="🏥 Nearby Veterinary Hospitals"
            className="page-title mb-4"
            delay={0.3}
            stagger={0.05}
          />
          <p className="text-xl text-green-100">Find qualified veterinarians and emergency care for your livestock</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Location Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Search */}
          <Card className="lg:col-span-2 bg-white/90 backdrop-blur-sm border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <Search className="w-5 h-5" />
                Search Hospitals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 w-4 h-4" />
                <Input
                  placeholder="Search by hospital name, city, district, state, or specialization..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-green-200 focus:border-amber-400 focus:ring-amber-400"
                />
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card className="bg-white/90 backdrop-blur-sm border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <MapPin className="w-5 h-5" />
                Your Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={useCurrentLocation}
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
              >
                {loading ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                    Getting Location...
                  </>
                ) : (
                  <>
                    <Navigation className="w-4 h-4 mr-2" />
                    Use GPS Location
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Map Section */}
        <Card className="mb-8 bg-white/90 backdrop-blur-sm border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <MapPin className="w-5 h-5" />
              Hospital Locations Map - Showing {filteredHospitals.length} hospitals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              ref={mapRef}
              className="w-full h-96 rounded-lg border-2 border-green-200"
              style={{ minHeight: '400px' }}
            />
          </CardContent>
        </Card>

        {/* Emergency Services Banner */}
        <Card className="mb-8 bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-800">24/7 Emergency Veterinary Hotline</h3>
                  <p className="text-red-600">For critical livestock emergencies requiring immediate attention</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button 
                  onClick={() => handleCall("+911800VETHELP")}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Emergency
                </Button>
                <Button 
                  onClick={() => handleWhatsApp("911800VETHELP", "Emergency Veterinary Services")}
                  variant="outline"
                  className="border-red-300 text-red-700 hover:bg-red-50"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hospitals List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-green-800">
              Found {filteredHospitals.length} Veterinary Hospitals
            </h2>
            <div className="flex gap-2">
              <div className="flex items-center gap-1 text-sm text-green-600">
                <Shield className="w-4 h-4" />
                <span>{filteredHospitals.filter(h => h.emergency).length} Emergency</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-amber-600">
                <Zap className="w-4 h-4" />
                <span>{filteredHospitals.filter(h => !h.emergency).length} Regular</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredHospitals.map((hospital, index) => (
              <Card 
                key={hospital.id} 
                className={`bg-white/90 backdrop-blur-sm hover:scale-105 transition-all duration-300 ${
                  hospital.emergency ? 'border-red-200 shadow-red-100' : 'border-amber-200'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-green-800">{hospital.name}</h3>
                        {hospital.emergency && (
                          <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            24/7 Emergency
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`w-4 h-4 ${
                                star <= hospital.rating 
                                  ? 'text-amber-500 fill-current' 
                                  : 'text-gray-300'
                              }`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium text-green-700">{hospital.rating}</span>
                      </div>
                      <p className="text-sm text-green-600 font-medium mb-1">{hospital.specialization}</p>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-800 mb-1">{hospital.distance}</div>
                      <div className="text-xs text-green-600">away</div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <MapPin className="w-4 h-4 text-green-600" />
                      <span>{hospital.address}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="font-medium">📍 Location:</span>
                      <span>{hospital.city}, {hospital.district}, {hospital.state}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Phone className="w-4 h-4 text-green-600" />
                      <span>{hospital.contact}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Clock className="w-4 h-4 text-green-600" />
                      <span>{hospital.availability}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <Button 
                      onClick={() => handleCall(hospital.contact)}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-xs"
                    >
                      <Phone className="w-3 h-3 mr-1" />
                      Call
                    </Button>
                    
                    <Button 
                      onClick={() => handleWhatsApp(hospital.whatsapp, hospital.name)}
                      className="bg-green-500 hover:bg-green-600 text-white text-xs"
                    >
                      <MessageCircle className="w-3 h-3 mr-1" />
                      WhatsApp
                    </Button>
                    
                    <Button 
                      onClick={() => handleDirections(hospital)}
                      variant="outline"
                      className="border-amber-400 text-amber-700 hover:bg-amber-50 text-xs"
                    >
                      <Navigation className="w-3 h-3 mr-1" />
                      Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {/* Quick Tips */}
          <Card className="bg-white/90 backdrop-blur-sm border-amber-200">
            <CardHeader>
              <CardTitle className="text-green-800">🩺 Emergency Preparedness Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Keep your veterinarian's contact readily available</li>
                <li>• Know the nearest 24/7 emergency clinic location</li>
                <li>• Maintain a basic first aid kit for livestock</li>
                <li>• Document your animal's medical history</li>
                <li>• Have transportation ready for emergency situations</li>
              </ul>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default NearbyHospitals;