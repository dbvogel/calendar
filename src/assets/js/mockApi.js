
export function fetchMonths() {
    return new Promise((resolve) => {
     
        setTimeout(() => {
        
          const startDate = new Date(2023, 5, 1);
          const endDate = new Date(2023, 5, 30);
          const month = [];
          let currentDate = new Date(startDate);
    
          while (currentDate <= endDate) {
            const day = {
              date: currentDate.toISOString().slice(0, 10),
              isBlocked: Math.random() < 0.5, 
            };
            month.push(day);
            currentDate.setDate(currentDate.getDate() + 1);
          }
    
    
          resolve(month);
        }, 1000);
      });
    }
  

  
  