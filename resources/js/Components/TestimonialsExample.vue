<template>
  <div class="bg-gray-50 py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          What Our Clients Say
        </h2>
        <p class="mt-4 text-lg text-gray-600">
          Hear from our satisfied customers about their experience with us
        </p>
      </div>
      
      <AnimatedTestimonials :testimonials="testimonials" :autoplay="true" />
    </div>
  </div>
</template>

<script setup>
import AnimatedTestimonials from './AnimatedTestimonials.vue'

const testimonials = [
  {
    quote: "This service has completely transformed our business operations. The team is professional, responsive, and delivers exceptional results every time.",
    name: "Sarah Johnson",
    designation: "CEO, TechCorp Inc.",
    src: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
  },
  {
    quote: "Outstanding customer service and attention to detail. They understood our needs perfectly and delivered beyond our expectations.",
    name: "Michael Chen",
    designation: "Operations Manager, Global Solutions",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
  },
  {
    quote: "The quality of work and professionalism shown by this team is remarkable. They've become an integral part of our success.",
    name: "Emily Rodriguez",
    designation: "Director of Marketing, InnovateNow",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    quote: "Reliable, efficient, and innovative. This partnership has helped us achieve our goals faster than we ever imagined possible.",
    name: "David Thompson",
    designation: "Founder, StartupVenture",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  }
]
</script>