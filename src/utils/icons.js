// src/utils/icons.js
import { 
  Users, Star, Award, Clock, Eye, Calendar, Phone, MapPin, ChevronLeft, ChevronRight 
} from 'lucide-react';

export const iconComponents = {
  Users, Star, Award, Clock, Eye, Calendar, Phone, MapPin, ChevronLeft, ChevronRight
};

export const getIconComponent = (iconName) => {
  return iconComponents[iconName] || Eye; // Fallback to Eye icon
};