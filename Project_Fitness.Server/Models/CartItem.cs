﻿using System;
using System.Collections.Generic;

namespace Project_Fitness.Server.Models;

public partial class CartItem
{
    public int Id { get; set; }

    //public int UserId { get; set; }
    public int? CartId { get; set; }

    public int? ProductId { get; set; }

    public int Quantity { get; set; }

    public decimal Price { get; set; }

    public virtual Cart? Cart { get; set; }

    public virtual Product? Product { get; set; }
}
