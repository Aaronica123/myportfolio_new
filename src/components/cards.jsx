import React from 'react';
import { Card, Inset, Text, Button } from '@radix-ui/themes';
import { ShoppingCart, MapPin, Check, Building2 } from 'lucide-react';

export default function Cardimage({ text, onAddToCart, isCarted, onSelect }) {
  // Extract or fallback image URL matching the image component
  const fallbackImage = 'https://i.pinimg.com/736x/3c/55/f4/3c55f4e4cf85f4e755cda28b9c0add3e.jpg';
  let imageSrc = fallbackImage;
  let textList = [];
  let houseMeta = {
    id: '101',
    house_name: 'Comrade Student Residence',
    type: 'Bedsitter',
    price: 'KES 6,500 / month',
    location: 'Kakamega, near MMUST',
    amenities: 'Water 24/7, WiFi',
  };

  if (Array.isArray(text)) {
    const rawStrings = text.map((item) => String(item));
    const foundImage = rawStrings.find((str) => str.startsWith('http://') || str.startsWith('https://'));
    if (foundImage) {
      imageSrc = foundImage;
    }

    // Filter out image URLs and standalone raw numeric IDs so display text is clean
    textList = rawStrings.filter(
      (str) => !str.startsWith('http') && !(str.length <= 4 && !isNaN(Number(str)))
    );

    if (textList.length > 0) houseMeta.house_name = textList[0];
    if (textList.length > 1) houseMeta.type = textList[1];
    if (textList.length > 2) houseMeta.price = textList[2];
    if (textList.length > 3) houseMeta.location = textList[3];
    if (textList.length > 4) houseMeta.amenities = textList[4];
  } else if (text && typeof text === 'object') {
    imageSrc = text.image_url || fallbackImage;
    houseMeta = {
      id: String(text.id || '101'),
      house_name: text.house_name || text.name || 'Comrade Student Residence',
      type: text.type || 'Bedsitter',
      price: text.price || 'KES 6,500 / month',
      location: text.location || 'Kakamega, near MMUST',
      amenities: text.amenities || 'Water 24/7, WiFi',
    };
    textList = [
      houseMeta.house_name,
      houseMeta.type,
      houseMeta.price,
      houseMeta.location,
      houseMeta.amenities,
    ];
  } else if (typeof text === 'string') {
    textList = [text];
    houseMeta.house_name = text;
  }

  // Fallback if text list is empty
  if (textList.length === 0) {
    textList = [
      'Greenfield Comrades Heights',
      'Bedsitter (Self-Contained)',
      'KES 6,500 / month',
      'Kefinco, Kakamega (450m from MMUST)',
      'Borehole Water 24/7, WiFi'
    ];
  }

  const handleCardClick = () => {
    if (onSelect) {
      onSelect({
        ...houseMeta,
        image_url: imageSrc,
      });
    }
  };

  return (
    <Card
      size={"2"}
      onClick={handleCardClick}
      style={{
        backgroundColor: isCarted ? '#f0fdf4' : '#ffffff',
        borderRadius: '14px',
        border: isCarted ? '1px solid #10b981' : '1px solid #e2e8f0',
        boxShadow: '0 2px 8px -2px rgba(15, 23, 42, 0.06)',
        flexDirection: 'row',
        display: 'flex',
        width: '100%',
        cursor: onSelect ? 'pointer' : 'default',
        overflow: 'hidden',
        transition: 'all 0.2s ease',
        position: 'relative'
      }}
    >
      <Inset clip={"padding-box"} pb={"current"} side={"left"}>
        <img
          src={imageSrc}
          alt={"house image"}
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
          style={{
            objectFit: "cover",
            width: "150px",
            minWidth: "120px",
            height: "100%",
            minHeight: "130px",
            display: "block"
          }}
        />
      </Inset>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '4px',
          paddingLeft: '16px',
          paddingRight: '12px',
          flex: 1,
          minWidth: 0
        }}
      >
        {textList.map((data, idx) => {
          const isPrice = String(data).includes('KES') || String(data).includes('ksh') || String(data).includes('/ month');
          const isTitle = idx === 0;

          return (
            <Text
              key={idx}
              size={isTitle ? "4" : isPrice ? "3" : "2"}
              style={{
                fontFamily: "inherit",
                fontWeight: isTitle ? 700 : isPrice ? 700 : 500,
                color: isPrice ? '#059669' : isTitle ? '#0f172a' : '#64748b',
                lineHeight: 1.35,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {data}
            </Text>
          );
        })}

        {/* Add to cart button as a button no on click using radix and lucide react imports */}
        <div style={{ marginTop: '8px' }}>
          <Button
            size={"2"}
            variant="solid"
            color={isCarted ? "green" : "indigo"}
            style={{
              cursor: 'pointer',
              borderRadius: '10px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 600,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            {isCarted ? (
              <>
                <Check size={14} />
                <span>Shortlisted</span>
              </>
            ) : (
              <>
                <ShoppingCart size={14} />
                <span>Add to Cart</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}
