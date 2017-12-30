export class SubEvent {
    innerEventID: number;
    innerEventTitle: string;
    innerEventStartDate: string;
    innerEventEndDate: string;
    innerEventDescription: string;
    EventId: number;
    


    constructor(    innerEventTitle: string, innerEventStartDate: string, innerEventEndDate: string, 
                    innerEventDescription: string, EventId: number ){
      
            this.innerEventTitle =     innerEventTitle;  
            this.innerEventStartDate =  innerEventStartDate;
            this.innerEventEndDate =   innerEventEndDate;
            this.innerEventDescription = innerEventDescription;
            this.EventId =  EventId;
           
    }

    


    
}